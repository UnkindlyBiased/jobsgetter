import { Controller, Get, Query } from "@nestjs/common";

import { VacancyService } from "./vacancy.service";
import { GetDataByPageDto } from "../../common/dto/get-data-by-page.dto";

@Controller('vacancies')
export class VacancyController {
    constructor(private service: VacancyService) {}
    
    @Get('all')
    async getAllVacancies(@Query() pageQuery: GetDataByPageDto) {
        return await this.service.getVacancies(pageQuery);
    }
}