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
    async verifyRefreshToken(refreshToken: string) {
        try {
            const payload: JwtPayloadDto = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('REFRESH_TOKEN_SECRET')
            })

            return payload
        } catch {
            return null
        }
    }
}