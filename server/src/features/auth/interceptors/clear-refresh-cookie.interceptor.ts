import {
  	CallHandler,
  	ExecutionContext,
  	Injectable,
  	NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { CookieHelper } from '../helpers/cookie.helper';
import { REFRESH_TOKEN_COOKIE } from '../../../../utils/constants/code.constants';

@Injectable()
export class ClearRefreshCookieInterceptor implements NestInterceptor {
	constructor(private helper: CookieHelper) {}

  	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    	return next.handle().pipe(
			tap(() => {
				const res = context.switchToHttp().getResponse()

				this.helper.clearCookie(REFRESH_TOKEN_COOKIE, res)
			})
		);
  	}
}
