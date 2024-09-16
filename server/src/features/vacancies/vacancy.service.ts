import { Injectable } from "@nestjs/common";

import { VacancyRepository } from "./vacancy.repository";
import { VacancyEntity } from "./vacancy.entity";

@Injectable()
export class VacancyService {
    constructor(private repository: VacancyRepository) {}

    async getVacancies(): Promise<VacancyEntity[]> {
        return this.repository.getAll()
    }
}