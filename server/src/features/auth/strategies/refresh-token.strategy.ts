import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";

import { REFRESH_TOKEN_STRATEGY } from "../../../../utils/constants/code.constants";
import { UserPayloadDto } from "../dto/user-payload.dto";
import { AuthService } from "../auth.service";
import { RefreshCookieExtractor } from "../extractors/cookie.extractor";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN_STRATEGY) {
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([RefreshCookieExtractor]),
            secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
            ignoreExpiration: false,
        })
    }

    async validate(paylaod: JwtPayloadDto): Promise<UserPayloadDto> {
        return this.authService.generatePayload(paylaod.sub.id)
    }
}