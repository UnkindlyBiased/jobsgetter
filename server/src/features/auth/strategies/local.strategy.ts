import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-local";

import { AuthService } from "../auth.service";
import { UserPayloadDto } from "../dto/user-payload.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly service: AuthService) {
        super({
            usernameField: 'emailAddress'
        })
    }

    async validate(emailAddress: string, password: string): Promise<UserPayloadDto> {
        return await this.service.login({ emailAddress, password })
    }
}