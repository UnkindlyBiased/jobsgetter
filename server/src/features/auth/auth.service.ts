import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { hash, compare } from 'bcrypt'
import { plainToInstance } from "class-transformer";

import { UserRepository } from "../users/user.repository";
import { UserCreateDto } from "./dto/user-create.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserPayloadDto } from "./dto/user-payload.dto";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
import { TokenHelper } from "./helpers/token.helper";

@Injectable()
export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private tokenHelper: TokenHelper,
    ) {}

    async registrate(input: UserCreateDto): Promise<void> {
        const exists = await this.userRepo.isUserExistingByCondition({ emailAddress: input.emailAddress })
        if (exists) {
            throw new ConflictException('The given email is already in usage')
        }

        const { password, ...rest } = input
        const hashedPassword = await hash(password, 3)

        this.userRepo.createUser({ ...rest, password: hashedPassword })
    }
    async login(input: UserLoginDto): Promise<UserPayloadDto> {
        const userData = await this.userRepo.getUserByCondition({ emailAddress: input.emailAddress })

        const isPasswordEqual = await compare(input.password, userData.password)
        if (!isPasswordEqual) {
            throw new ForbiddenException("Passwords aren't equal")
        }

        return plainToInstance(UserPayloadDto, userData, {
            excludeExtraneousValues: true
        })
    }
    async generatePayload(id: string): Promise<UserPayloadDto> {
        const userData = await this.userRepo.getUserByCondition({ id })

        return plainToInstance(UserPayloadDto, userData, {
            excludeExtraneousValues: true
        })
    }
    async generateTokens(userData: UserPayloadDto) {
        const payload: JwtPayloadDto = { sub: userData }

        const accessToken = await this.tokenHelper.signAccessToken(payload)
        const refreshToken = await this.tokenHelper.signRefreshToken(payload)
        
        return { accessToken, refreshToken }
    }
}