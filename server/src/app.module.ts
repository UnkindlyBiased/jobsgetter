import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { FeaturesModule } from "./features/features.module";
import { CommonModule } from "./common/common.module";

@Module({
    imports: [
        CommonModule,
        FeaturesModule
    ],
    controllers: [AppController]
})
export class AppModule {}