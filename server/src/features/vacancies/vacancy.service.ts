import { Injectable } from "@nestjs/common";

import { VacancyRepository } from "./vacancy.repository";
import { VacancyEntity } from "./vacancy.entity";
import { GetVacanciesDto } from "./dto/get-vacancies.dto";

@Injectable()
export class VacancyService {
    constructor(private repository: VacancyRepository) {}

    async getVacancies(pageQuery: GetVacanciesDto): Promise<VacancyEntity[]> {
        return this.repository.getAll(pageQuery)
    }
}