import { Injectable } from '@angular/core';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  url : string = "https://localhost:7173";

  

}
