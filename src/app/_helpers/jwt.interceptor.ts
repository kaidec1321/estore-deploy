import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/authentication.service';
import { GlobalService } from '../_services/global.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private globalService: GlobalService) { }
    

    count: number = 0;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        this.count++;
        this.globalService.announceLoading(true);
        return next.handle(request).pipe(finalize(() => {
            this.count--;
            if (this.count == 0) this.globalService.announceLoading(false);
        }));
    }
}