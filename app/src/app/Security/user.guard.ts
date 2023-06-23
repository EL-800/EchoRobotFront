import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class UserGuard implements CanActivate{

    constructor(private router : Router,
    private auth : AuthService){

    }
    
    canActivate() {
        const usuario = this.auth.UserData;

        if(Object.entries(usuario).length == 0) return true

        this.router.navigate(['/home'])
        return false;
    }
}