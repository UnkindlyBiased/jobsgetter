import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { JwtPayloadDto } from "../dto/jwt-payload.dto";

@Injectable()
export class TokenHelper {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}
    async signAccessToken(payload: JwtPayloadDto) {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('ACCESS_TOKEN_SECRET'),
            expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN')
        })
    }
    async signRefreshToken(payload: JwtPayloadDto) {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
            expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN')
        })
    }
}