import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { VacancyEntity } from "./vacancy.entity";
import { VacancyService } from "./vacancy.service";
import { VacancyRepository } from "./vacancy.repository";
import { VacancyController } from "./vacancy.controller";

@Module({
    imports: [TypeOrmModule.forFeature([VacancyEntity])],
    controllers: [VacancyController],
    providers: [VacancyService, VacancyRepository],
})
export class VacancyModule {}