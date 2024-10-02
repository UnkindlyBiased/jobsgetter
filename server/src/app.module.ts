import { Module } from "@nestjs/common";

import { FeaturesModule } from "./features/features.module";
import { CommonModule } from "./common/common.module";

@Module({
    imports: [
        CommonModule,
        FeaturesModule
    ]
})
export class AppModule {}