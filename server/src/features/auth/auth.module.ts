import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from "../users/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "../../../utils/strategies/local.strategy";
import { AccessTokenStrategy } from "../../../utils/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "../../../utils/strategies/refresh-token.strategy";
import { TokenHelper } from "../../../utils/helpers/token.helper";
import { CookieHelper } from "../../../utils/helpers/cookie.helper";

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({}),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy, TokenHelper, CookieHelper],
})
export class AuthModule {}