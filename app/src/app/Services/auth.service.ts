import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { authUser } from '../models/authUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggingUser } from '../models/Logging.model';

const httpOptions ={
  headers:new HttpHeaders({
    'Contend-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthUrl: string = "https://localhost:7173/api/User/logging";
  
  


  private UserSubject: BehaviorSubject<any>
  public User: Observable<authUser>;

  constructor(private _httpCLient: HttpClient) {
    this.UserSubject = new BehaviorSubject<authUser>(JSON.parse(localStorage.getItem('usuario') || '{}'));
    this.User = this.UserSubject.asObservable();
  }

  public get UserData(): authUser {
    return this.UserSubject.value;
  }

  logging(logging: LoggingUser){
    return this._httpCLient.post(this.AuthUrl,logging,httpOptions).pipe(
      map(res =>{
        const user = res as authUser
        //const user : authUser = JSON.parse(res.toString());
        localStorage.setItem('usuario',JSON.stringify(user))
        this.UserSubject.next(user);
        return user;
      }),
      catchError(err =>{
        if(err.status == 400){
          console.log("Credenciales incorrectas")
          return err;
        }
      })
    )
  }
  logout(){
    localStorage.removeItem('usuario');
    this.UserSubject.next({});
  }
}
