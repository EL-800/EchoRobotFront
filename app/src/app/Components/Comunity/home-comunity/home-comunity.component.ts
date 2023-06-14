import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunityServiceService } from 'src/app/Services/comunity-service.service';
import { ListPublication } from 'src/app/models/list-publication.model';

@Component({
  selector: 'app-home-comunity',
  templateUrl: './home-comunity.component.html',
  styleUrls: ['./home-comunity.component.css']
})
export class HomeComunityComponent implements OnInit {

  constructor(private comunity : ComunityServiceService, private router : Router) { }
  
  listPublication : ListPublication[] = []


  ngOnInit(): void {
    this.ObtenerPublicaciones();
  }


  ObtenerPublicaciones(){
    this.comunity.listPublications().subscribe(res =>{
      if(res.exito === 1){
        this.listPublication = res.data;
      }
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
