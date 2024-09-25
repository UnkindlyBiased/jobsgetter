import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from 'bcrypt'

import { UserRepository } from "../users/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly repo: UserRepository) {}

    async registrate(input: CreateUserDto) {
        const exists = await this.repo.isUserExistingByCondition({ emailAddress: input.emailAddress })
        if (exists) {
            throw new ConflictException('The given email is already in usage')
        }

        const { password, ...rest } = input
        const hashedPassword = await hash(password, 3)

        return this.repo.createUser({ ...rest, password: hashedPassword })
    }
}