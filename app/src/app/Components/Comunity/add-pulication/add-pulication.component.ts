import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { ComunityServiceService } from 'src/app/Services/comunity-service.service';
import { PublicationRequest } from 'src/app/models/AddPublicationRequest.model';

@Component({
  selector: 'app-add-pulication',
  templateUrl: './add-pulication.component.html',
  styleUrls: ['./add-pulication.component.css']
})
export class AddPulicationComponent implements OnInit {

  files : File[] = [];
  dataUrl : string[] = [];

  //formulario
  formulario : PublicationRequest =  {
    titulo: "",
    descripcion : "",
    elementos : [],
    idAutor : 0
    
  }

  previsualizacion: string = "";
  constructor(private sanitizer: DomSanitizer, private comunity : ComunityServiceService, private router : Router , private auth : AuthService) { }

  ngOnInit(): void {
  }

  capturarFile(event : any){
   
    this.files = event.target.files;
    let i = 0;
    for(let archivoCapturado of this.files){
      this.extraerBase64(archivoCapturado).then((image :any) =>{
        this.dataUrl.push = image.base;
        this.dataUrl[i] = image.base;
        i++; 
      })
    }
  }

  extraerBase64 = async ($event :any) => new Promise((resolve,reject)=>{
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader  = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = ()=>{
         resolve({
          Blob: $event,
          base: reader.result
        });
      }
      reader.onerror = error =>{
         resolve(
          {blob:$event,
          image,
          base:null}
        )
      }
    }
    catch(e){
        return null;
    }

  })

  addPublication(){
    this.auth.User.subscribe(res =>{
      this.formulario.idAutor = res.idUsuario;
    })

    let formData : FormData = new FormData();
    formData.append("Titulo",this.formulario.titulo);
    formData.append("IdAutor",this.formulario.idAutor.toString());
    formData.append("Descripcion",this.formulario.descripcion);


    for(let file of this.files){
      formData.append("Elementos",file);
    }



    this.comunity.addPublication(formData).subscribe(res =>{
      if(res.exito === 1){
        console.log(res);
        this.router.navigate(["/comunity"])
      }
    })
  }

}