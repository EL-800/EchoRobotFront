import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { min } from 'rxjs';
import { ComunityServiceService } from 'src/app/Services/comunity-service.service';
import { Publication } from 'src/app/models/publication.model';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  faComment = faComment;

  idPublication : number
  publication : Publication = {} as Publication

  imagesCount : number = 0;
  commentsCount : number = 0;
  constructor(private route : ActivatedRoute, private comunity : ComunityServiceService) { }

  ngOnInit(): void {
    this.idPublication = +this.route.snapshot.paramMap.get('id');
    this.comunity.getPublication(this.idPublication).subscribe(res =>{
      if(res.exito === 1){
        this.publication = res.data as Publication
        this.imagesCount = this.publication.multimedia.length;
        this.commentsCount = this.publication.comentarios.length;
      }
    })
  }

  Activity(fechaEnviada : Date){
    let date = new Date(fechaEnviada);
    if(date instanceof Date){
      const fecha = date.toLocaleDateString('es',{
        year:'2-digit',
        month:'2-digit',
        day : 'numeric',
        hour: 'numeric',
        minute:'numeric'
      })
      return fecha;
    }
    return null
  }


}
