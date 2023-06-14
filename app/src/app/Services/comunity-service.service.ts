import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicationRequest } from '../models/AddPublicationRequest.model';
import { Observable } from 'rxjs';


const httpOptions = {
  headers:new HttpHeaders({
    'Contend-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ComunityServiceService {

  urlAdd : string = "https://localhost:7173/api/Comunity/AddPublication";
  urlListPublications : string = "https://localhost:7173/api/Comunity/Publicaciones";

  constructor(private _httpCliet : HttpClient) { 

  }
/*
  addPublication(add : PublicationRequest):Observable<any>{
    return this._httpCliet.post<Response>(this.urlAdd,add,httpOptions)
  }
  */

  addPublication(add : FormData):Observable<any>{
    return this._httpCliet.post<Response>(this.urlAdd,add,httpOptions)
  }

  listPublications():Observable<any>{
    return this._httpCliet.get<Response>(this.urlListPublications,httpOptions);
  }
}
