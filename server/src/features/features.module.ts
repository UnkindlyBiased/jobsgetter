import { Module } from "@nestjs/common";

import { VacancyModule } from "./vacancies/vacancy.module";
import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        VacancyModule,
        UserModule,
        AuthModule
    ]
})
export class FeaturesModule {}