import { Controller, Get } from "@nestjs/common";

import { VacancyService } from "./vacancy.service";

@Controller('vacancies')
export class VacancyController {
    constructor(private service: VacancyService) {}
    
    @Get('all')
    async getAllVacancies() {
        return await this.service.getVacancies();
    }
}