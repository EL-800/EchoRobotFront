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


  constructor(private _http : HttpClient) {
  }
  
  addUser(User : User):Observable<Response>{
    return this._http.post<Response>(this.urlApiUser,User);
  }

  getImage(id: number):Observable<Response>{
    return this._http.post<Response>(this.urlApiUser,id);
  }
}
