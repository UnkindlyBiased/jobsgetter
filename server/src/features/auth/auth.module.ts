import { Module } from "@nestjs/common";

import { UserModule } from "../users/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "../../../utils/strategies/local.strategy";
import { LocalGuard } from "../../../utils/guards/local.guard";

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, LocalGuard],
    imports: [UserModule]
})
export class AuthModule {}