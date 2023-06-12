import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-pulication',
  templateUrl: './add-pulication.component.html',
  styleUrls: ['./add-pulication.component.css']
})
export class AddPulicationComponent implements OnInit {

  files : File[] = [];
  dataUrl : string[] = [];

  previsualizacion: string = "";
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  capturarFile(event : any){
   
    this.files = event.target.files;
    let i = 0;
    for(let archivoCapturado of this.files){
      this.extraerBase64(archivoCapturado).then((image :any) =>{
        this.dataUrl.push = image.base;
        console.log(image.base);
        this.dataUrl[i] = image.base;
        i++; 
      })
    }
   
    /* const archivoCapturado = event.target.files[0];
    
    this.extraerBase64(archivoCapturado).then((imagen:any) =>{
      this.previsualizacion = imagen.base;
      console.log(imagen);
    })
    */
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

}