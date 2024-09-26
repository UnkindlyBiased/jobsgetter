import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { hash, compare } from 'bcrypt'

import { UserRepository } from "../users/user.repository";
import { UserCreateDto } from "./dto/user-create.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { JwtService } from "@nestjs/jwt";
import { UserPayloadDto } from "./dto/user-payload.dto";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly repo: UserRepository
    ) {}

    async registrate(input: UserCreateDto) {
        const exists = await this.repo.isUserExistingByCondition({ emailAddress: input.emailAddress })
        if (exists) {
            throw new ConflictException('The given email is already in usage')
        }

        const { password, ...rest } = input
        const hashedPassword = await hash(password, 3)

        return this.repo.createUser({ ...rest, password: hashedPassword })
    }
    async login(input: UserLoginDto) {
        const userData = await this.repo.getUserByCondition({ emailAddress: input.emailAddress })

        const isPasswordEqual = await compare(input.password, userData.password)
        if (!isPasswordEqual) {
            throw new ForbiddenException("Passwords aren't equal")
        }

        const { password, ...user } = userData
        return user
    }
    async generateJwtToken(userData: UserPayloadDto): Promise<string> {
        const payload: JwtPayloadDto = { sub: userData }
        const token = await this.jwtService.signAsync(payload)
        
        return token
    }
}