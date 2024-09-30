import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    UseGuards,
} from "@nestjs/common";
import { Response } from "express";

import { AuthService } from "./auth.service";
import { UserCreateDto } from "./dto/user-create.dto";
import { LocalGuard } from "../../../utils/guards/local.guard";
import { User } from "../../../utils/decorators/user.decorator";
import { UserPayloadDto } from "./dto/user-payload.dto";
import { AccessTokenGuard } from "../../../utils/guards/access-token.guard";
import { RefreshTokenGuard } from "../../../utils/guards/refresh-token.guard";
import { CookieHelper } from "../../../utils/helpers/cookie.helper";
import { REFRESH_TOKEN_COOKIE } from "../../../utils/constants/code.constants";

@Controller('auth')
export class AuthController {
    constructor(
        private service: AuthService,
        private cookieHelper: CookieHelper,
    ) {}

    @Post('registrate')
    async registrate(@Body() input: UserCreateDto) {
        await this.service.registrate(input);

        return { message: 'Registration was successful' }
    };

    @UseGuards(LocalGuard)
    @Post('login')
    async login(
        @User() user: UserPayloadDto,
        @Res() res: Response
    ) {
        const tokens = await this.service.generateTokens(user);
        this.cookieHelper.setCookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, res)

        res.send({ user, tokens })
    };

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(
        @User() user: UserPayloadDto,
        @Res() res: Response
    ) {
        const tokens = await this.service.generateTokens(user)
        this.cookieHelper.setCookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, res)

        res.send({ user, tokens })
    }

    @UseGuards(AccessTokenGuard)
    @Get('profile')
    async getProfile(@User() user: UserPayloadDto) {
        return user
    }
};
