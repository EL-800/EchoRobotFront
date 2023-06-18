import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { min } from 'rxjs';
import { ComunityServiceService } from 'src/app/Services/comunity-service.service';
import { Publication } from 'src/app/models/publication.model';
import { Comment } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { text } from '@fortawesome/fontawesome-svg-core';
import { DomSanitizer } from '@angular/platform-browser';

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

  isLogged : boolean = false;

  formComment : FormGroup = this.formbuilder.group({
    comment : ['',Validators.required]
  })
  idUserCurrently : number = 0;

  isAuthor : boolean = false
  proyectPath : any = null;

  constructor(private route : ActivatedRoute, 
    private comunity : ComunityServiceService,
     private auth : AuthService, 
    private formbuilder : FormBuilder,
    private router : Router,
    private sanitezer : DomSanitizer) { }

  ngOnInit(): void {
    this.idPublication = +this.route.snapshot.paramMap.get('id');
    this.comunity.getPublication(this.idPublication).subscribe(res =>{
      if(res.exito === 1){
        this.publication = res.data as Publication
        this.imagesCount = this.publication.multimedia.length;
        this.commentsCount = this.publication.comentarios.length;
        this.uploadXml(this.publication.proyecto);
        this.auth.User.subscribe(e => {
          if(Object.entries(e).length > 0){
            this.isLogged = true
            this.idUserCurrently = e.idUsuario;
            if(e.idUsuario === this.publication.idAutor){
              this.isAuthor = true; 
            }else{
              this.isAuthor = false;
            }
          }
          else{
            this.isLogged = false;
          }
        })
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

  

  agregarComentario(){
    const data = new FormData();
    data.append("descripcion",this.formComment.get('comment').value);
    data.append('idPublicacion',this.idPublication.toString())
    data.append('idAutor',this.idUserCurrently.toString())

    this.comunity.addCommnet(data).subscribe({
      next: (response) =>{console.log(response); window.location.reload()},
      error : (response) => console.log("error" + response.message)
    })
  }

  getIniciales(nombre : string , apellido: string){
    if(nombre == null || apellido == null) return "";
    return nombre.charAt(0) + apellido.charAt(0);
  }


  uploadXml(text : string ){
    
    this.extraerBase64(text).then((xml:any)=>{
      this.proyectPath = xml.Blob;
    })
  }
  extraerBase64= async(xml:string) => new Promise((resolve,reject)=>{
    try{
      const xmlBlob = new Blob([xml],{type:'text/xml'})
      const file = window.URL.createObjectURL(xmlBlob)
      const xmlFile = this.sanitezer.bypassSecurityTrustUrl(file);
      const reader = new FileReader();
      reader.readAsDataURL(xmlBlob);
      reader.onload = ()=>{
        resolve({
          Blob: xmlFile,
          base: reader.result
        })
      }
    }catch(e){
      return null
    }
  })
}
