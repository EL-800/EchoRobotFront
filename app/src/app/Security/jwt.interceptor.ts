import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../Services/auth.service";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";
import { Observable } from "rxjs";


@Injectable()
export class JwtInterceptor {

    constructor(private _authService : AuthService){

    }

    intercept(request:HttpRequest<any>,next : HttpHandler) : Observable<HttpEvent<any>>{
        const usuario = this._authService.UserData;

        if(usuario){
            request = request.clone({
                setHeaders: {
                    Authorization : `Bearer ${usuario.Token}`
                }
            })
        }
        return next.handle(request);
    }
}