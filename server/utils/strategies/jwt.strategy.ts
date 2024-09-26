import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayloadDto } from "../../src/features/auth/dto/jwt-payload.dto";
import { UserPayloadDto } from "../../src/features/auth/dto/user-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService
    ) {
        super({
            usernameField: 'emailAddress',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
            ignoreExpiration: false
        })
    }

    async validate(payload: JwtPayloadDto): Promise<UserPayloadDto> {
        return payload.sub
    }
}