import { Module } from "@nestjs/common";

import { VacancyModule } from "./vacancies/vacancy.module";

@Module({
    imports: [VacancyModule]
})
export class FeaturesModule {}