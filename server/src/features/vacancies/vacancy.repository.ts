import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { VacancyEntity } from "./vacancy.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetVacanciesDto } from "./dto/get-vacancies.dto";

@Injectable()
export class VacancyRepository {
    constructor(
        @InjectRepository(VacancyEntity) private repo: Repository<VacancyEntity>
    ) {}

    async getAll(getParams: GetVacanciesDto): Promise<VacancyEntity[]> {
        return await this.repo.find({
            take: getParams.take ,
            skip: (getParams.page - 1) * getParams.take,
            where: {
                isClosed: false
            }
        })
    }
    async getMaxPage(params: GetVacanciesDto): Promise<number> {
        return await this.repo.count({
            take: params.take,
            skip: (params.page - 1) * params.take
        })
    }
}