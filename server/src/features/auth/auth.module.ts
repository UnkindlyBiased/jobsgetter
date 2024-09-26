import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from "../users/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "../../../utils/strategies/local.strategy";
import { JwtStrategy } from "../../../utils/strategies/jwt.strategy";

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: config.get('ACCESS_TOKEN_EXPIRES_IN')
                }
            })
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}