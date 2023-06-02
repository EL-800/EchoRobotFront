import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Response } from '../models/response';
import { authUser } from '../models/authUser';
import { LoggingUser } from '../models/Logging.model';


const httpOptions ={
  headers:new HttpHeaders({
    'Contend-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlApiUser : string = "https://localhost:7173/api/User";
  urlLogging : string = "https://localhost:7173/api/User/logging";

  private UserSubject : BehaviorSubject<any>
  public User : Observable<authUser>;

  
  
  constructor(private _http : HttpClient) {
    this.UserSubject = new BehaviorSubject<authUser>(JSON.parse(localStorage.getItem('usuario')||'{}'));
    this.User = this.UserSubject.asObservable();
   }

  public get UserData():authUser{
    return this.UserSubject.value;
  }

  
  addUser(User : User):Observable<Response>{
    return this._http.post<Response>(this.urlApiUser,User);
  }

  logging(logging : LoggingUser):Observable<Response>{
    return this._http.post<Response>(this.urlLogging,logging,httpOptions).pipe(
      map(res =>{
        const user : authUser = res.data;
        localStorage.setItem('usuario',JSON.stringify(user));
        this.UserSubject.next(user); 
        return res
      }),
      catchError((err: HttpErrorResponse)=>{
        if(err.status === 401){
          return throwError("Credenciales invalidas");
        }
        return throwError("Error de inicio de sesio");
      })
    )
  }

  logout(){
    localStorage.removeItem('usuario');
    this.UserSubject.next(null);
  }
}
