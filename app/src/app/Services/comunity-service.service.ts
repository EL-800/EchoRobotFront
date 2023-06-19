import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicationRequest } from '../models/AddPublicationRequest.model';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';


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

  urlGetPublication : string = "https://localhost:7173/api/Comunity/Publicacion";

  urlAddComment : string = "https://localhost:7173/api/Comunity/AddComentario";

  urlDeletePublication : string = "https://localhost:7173/api/Comunity/DeletePublicacion";

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

  getPublication(id : number):Observable<any>{
    return this._httpCliet.get<Response>(this.urlGetPublication+`?id=${id}`,httpOptions)
  }

  addCommnet(comment : FormData):Observable<Response>{
    return this._httpCliet.post<Response>(this.urlAddComment,comment,httpOptions);
  }

  deletePublication(id : number):Observable<any>{
    return this._httpCliet.delete(this.urlDeletePublication + `?id=${id}`,httpOptions);
  }
}
