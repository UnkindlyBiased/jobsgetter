import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayloadDto } from "../dto/jwt-payload.dto";
import { UserPayloadDto } from "../dto/user-payload.dto";
import { ACCESS_TOKEN_STRATEGY } from "../../../../utils/constants/code.constants";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY) {
    constructor(
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
            ignoreExpiration: false
        })
    }

    async validate(payload: JwtPayloadDto): Promise<UserPayloadDto> {
        return payload.sub
    }
}