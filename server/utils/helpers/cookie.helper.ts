import { Injectable } from "@nestjs/common";
import { Response } from "express";

import { REFRESH_TOKEN_LIFE_MS } from "../constants/code.constants";

@Injectable()
export class CookieHelper {
    setCookie(key: string, value: string | number, res: Response) {
        res.cookie(key, value, {
            maxAge: REFRESH_TOKEN_LIFE_MS,
            httpOnly: true,
            sameSite: false
        });
    }
    clearCookie(key: string, res: Response) {
        res.clearCookie(key)
    }
}