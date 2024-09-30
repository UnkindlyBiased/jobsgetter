import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

import { REFRESH_TOKEN_STRATEGY } from "../constants/code.constants";
import { UserPayloadDto } from "../../src/features/auth/dto/user-payload.dto";
import { AuthService } from "../../src/features/auth/auth.service";
import { Cookies } from "../decorators/cookies.decorator";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN_STRATEGY) {
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            usernameField: 'emailAddress',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
            ignoreExpiration: false,
            passReqToCallback: true
        })
    }

    async validate(@Req() req: Request): Promise<UserPayloadDto> {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is not available')
        }

        return await this.authService.refresh(refreshToken)
    }
}