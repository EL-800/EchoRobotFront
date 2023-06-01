import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http : HttpClient) { }

  urlApiUser : string = "https://localhost:7173/api/User";

  
  addUser(User : User):Observable<Response>{
    return this._http.post<Response>(this.urlApiUser,User);
  }

}
