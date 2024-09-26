import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-local";

import { AuthService } from "../../src/features/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly service: AuthService) {
        super({
            usernameField: 'emailAddress'
        })
    }

    validate(emailAddress: string, password: string) {
        return this.service.login({ emailAddress, password })
    }
}