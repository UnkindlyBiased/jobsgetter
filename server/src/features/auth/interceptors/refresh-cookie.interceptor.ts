import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { CookieHelper } from '../helpers/cookie.helper';
import { REFRESH_TOKEN_COOKIE } from '../../../../utils/constants/code.constants';

@Injectable()
export class RefreshCookieInterceptor implements NestInterceptor {
    constructor(private helper: CookieHelper) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const res = context.switchToHttp().getResponse()
                const { tokens: { refreshToken } } = data

                this.helper.setCookie(REFRESH_TOKEN_COOKIE, refreshToken, res)

                return data
            })
        )
    }
}
