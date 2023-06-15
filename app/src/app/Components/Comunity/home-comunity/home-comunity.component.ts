import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ComunityServiceService } from 'src/app/Services/comunity-service.service';
import { ListPublication } from 'src/app/models/list-publication.model';

@Component({
  selector: 'app-home-comunity',
  templateUrl: './home-comunity.component.html',
  styleUrls: ['./home-comunity.component.css']
})
export class HomeComunityComponent implements OnInit {

  constructor(private comunity : ComunityServiceService, private router : Router, private auth : AuthService) { }
  
  listPublication : ListPublication[] = new Array<ListPublication>()

  isLogged : boolean = false

  ngOnInit(): void {
    this.ObtenerPublicaciones();
    this.auth.User.subscribe(res=>{
      if(Object.entries(res).length > 0){
        this.isLogged=true;
      }else{
        this.isLogged=false;
      }
    })
  }


  ObtenerPublicaciones(){
    this.comunity.listPublications().subscribe(res =>{
      if(res.exito === 1){
        this.listPublication = res.data;
      }
      console.log(this.listPublication)
    })
  }
  Activity(fechaEnviada : Date){
    let date = new Date(fechaEnviada);
    if(date instanceof Date){
      const fecha = date.toLocaleDateString('es',{
        year:'numeric',
        month:'short',
        day : 'numeric'
      })
      return fecha;
    }
    return null
  }
  getPublication(id : number){
    if(id){
      this.router.navigate(['/comunity/Publication',id])
    }
  }
}
