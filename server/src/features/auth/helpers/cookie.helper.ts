import { Injectable } from "@nestjs/common";
import { Response } from "express";

import { REFRESH_TOKEN_LIFE_MS } from "../../../../utils/constants/code.constants";

@Injectable()
export class CookieHelper {
    setCookie(key: string, value: string | number, res: Response) {
        res.cookie(key, value, {
            maxAge: REFRESH_TOKEN_LIFE_MS,
            httpOnly: true,
            sameSite: "none"
        });
    }
    clearCookie(key: string, res: Response) {
        res.clearCookie(key)
    }
}