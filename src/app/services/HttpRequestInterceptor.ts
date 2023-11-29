import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { concatMap, delay, retry, retryWhen } from 'rxjs/operators';
//import { Observable } from 'rxjs/dist/types/internal/Observable';

export const retryCount = 3;
export let retryWaitMilliSeconds = 0;
export const retryErrors = [503, 0];

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        
        request = request.clone({
            withCredentials: true
        });
        
        return next.handle(request).pipe(
            retryWhen(
                error => error.pipe(
                    concatMap((error, count) => {
                        if (count <= retryCount && retryErrors.includes(error.status)) {
                            retryWaitMilliSeconds = retryWaitMilliSeconds+4000;
                            return of(error);
                        }
                        return throwError(() => error);
                    }),
                    //delay(retryWaitMilliSeconds),
                    delay(500),
                )
            )
        )
    }
}