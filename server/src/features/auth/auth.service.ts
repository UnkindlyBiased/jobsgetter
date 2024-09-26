import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { hash, compare } from 'bcrypt'

import { UserRepository } from "../users/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginDto } from "./dto/user-login.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly repo: UserRepository
    ) {}

    async registrate(input: CreateUserDto) {
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
        if (!userData) {
            throw new NotFoundException('No users exist by this email')
        }

        const isPasswordEqual = await compare(input.password, userData.password)
        if (!isPasswordEqual) {
            throw new ForbiddenException("Passwords aren't equal")
        }

        const { password, ...rest } = userData
        return rest
    }
}