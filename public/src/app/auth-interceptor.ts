import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("got to authInterceptor");
        let token = localStorage.getItem('token');
        console.log("authint" , token);
        console.log("authint" , req);
        console.log("header before" , req.headers['authorization']);
        let authReq = req.clone({
            headers: req.headers.set('Authorization' , token)
        });
        console.log("authrequest" , authReq);
        console.log("headers after" , authReq.headers.get('Authorization'));
        return next.handle(authReq);
    
    }
}
