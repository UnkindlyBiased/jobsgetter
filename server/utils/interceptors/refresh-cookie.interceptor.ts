import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

import { CookieHelper } from '../helpers/cookie.helper';
import { REFRESH_TOKEN_COOKIE } from '../constants/code.constants';

@Injectable()
export class RefreshCookieInterceptor implements NestInterceptor {
    constructor(private helper: CookieHelper) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                console.log('Called')
                const res: Response = context.switchToHttp().getResponse()
                console.log(data)

                this.helper.setCookie(REFRESH_TOKEN_COOKIE, "refreshToken", res)

                return data
            })
        )
    }
}
