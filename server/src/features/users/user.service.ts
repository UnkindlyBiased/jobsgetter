import { Injectable } from "@nestjs/common";

import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
    constructor(private readonly repo: UserRepository) {}

    async getUsers(): Promise<UserEntity[]> {
        return await this.repo.getUsers();
    }
    async getUserById(id: string) {
        return await this.repo.getUserByCondition({ id })
    }
}