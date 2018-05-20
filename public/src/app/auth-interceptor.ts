import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
        let authReq = req.clone({
            headers: req.headers.set('Authorization' , token)
        });
        return next.handle(authReq);
    
    }
}
