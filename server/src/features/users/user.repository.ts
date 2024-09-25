import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";

import { UserEntity } from "./user.entity";
import { PartialKeys } from "../../../utils/types/partial-keys";
import { CreateUserDto } from "../auth/dto/create-user.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

    async getUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }
    async getUserByCondition(condition: PartialKeys<UserEntity>): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy(condition)
        if (!user) {
            throw new NotFoundException('No user was found by this condition')
        }

        return user
    }
    async createUser(input: CreateUserDto): Promise<void> {
        const entity = this.userRepository.create(input)

        await this.userRepository.insert(entity)
    }
    async isUserExistingByCondition(condition: PartialKeys<UserEntity>): Promise<boolean> {
        return await this.userRepository.existsBy(condition)
    }
}