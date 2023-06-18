import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { authUser } from '../models/authUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggingUser } from '../models/Logging.model';
import { Response } from '../models/response';

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

  logging(logging: FormData):Observable<Response>{
    return this._httpCLient.post<Response>(this.AuthUrl,logging,httpOptions).pipe(
      map (res=>{
        if(res.exito === 1){
          const data : authUser = res.data;
          localStorage.setItem('usuario',JSON.stringify(data));
          this.UserSubject.next(data);
        }
        return res;
      })
    )
  }
  logout(){
    localStorage.removeItem('usuario');
    this.UserSubject.next({});
  }
}
