import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { VacancyEntity } from "./vacancy.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class VacancyRepository {
    constructor(
        @InjectRepository(VacancyEntity) private repo: Repository<VacancyEntity>
    ) {}

    async getAll(): Promise<VacancyEntity[]> {
        return await this.repo.find()
    }
}