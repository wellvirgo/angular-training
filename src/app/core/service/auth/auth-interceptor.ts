import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService, IS_PUBLIC_API } from "./auth-service";
import { BehaviorSubject, catchError, filter, map, switchMap, take, tap, throwError } from "rxjs";

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const autherService = inject(AuthService);
    const accessToken = autherService.getToken();

    if (req.context.get(IS_PUBLIC_API)) {
        return next(req);
    }

    const newReq = addAuthHeader(req, accessToken);
    return next(newReq).pipe(
        catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return handle401Error(req, next, autherService);
            }

            return throwError(() => error);
        })
    );
}

function addAuthHeader(req: HttpRequest<unknown>, token: string) {
    return req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
}

function handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService) {
    if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.refreshToken().pipe(
            map(httpResponse => {
                return httpResponse.body
            }),
            switchMap((responseBody) => {
                isRefreshing = false;
                const newAccessToken = responseBody?.data.accessToken ?? '';

                authService.refresh(newAccessToken);
                refreshTokenSubject.next(newAccessToken);

                return next(addAuthHeader(req, newAccessToken));
            }),
            catchError(error => {
                isRefreshing = false;
                authService.logout();
                return throwError(() => error);
            })
        );
    } else {
        return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token => next(addAuthHeader(req, token)))
        );
    }
}