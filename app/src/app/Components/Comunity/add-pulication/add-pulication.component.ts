import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isFormValid : boolean = true;
  isOpenDialogBox:boolean = false;
  dialogMessage : string ="";
  xmlFile : File = {} as File;
  //formulario
  

  addForm : FormGroup = this.formBuilder.group({
    Titulo : ['',[Validators.required,Validators.minLength(8)]], 
    Descripcion : ['', [Validators.required , Validators.minLength(20)]],
    Elements : [ [] ,[Validators.required]],
    Proyect : [null,[Validators.required]]
  })


  previsualizacion: string = "";
  constructor(private sanitizer: DomSanitizer, 
    private comunity : ComunityServiceService,
    private router : Router ,
    private auth : AuthService, 
    private formBuilder : FormBuilder) { }

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

    if(this.addForm.valid){
      this.auth.User.subscribe(res =>{
        const idAutor : number = res.idUsuario;
        const formData : FormData = new FormData();
        formData.append("Titulo",this.addForm.get('Titulo').value);
        formData.append("IdAutor",idAutor.toString());
        formData.append("Descripcion",this.addForm.get("Descripcion").value);
        formData.append('Proyecto',this.xmlFile);
        for(let file of this.files){
          formData.append("Elementos",file);
        }
        this.comunity.addPublication(formData).subscribe({
          next : ()=>{this.router.navigate(["/comunity"])},
          error: ()=>{
            this.dialogMessage = "Hubo un problema al publicar, intenta de nuevo"
            this.isOpenDialogBox = true;
          }
        })
      })
    }else{
      this.isFormValid = false
      setTimeout(() => {
        this.isFormValid = true;
      }, 4000);
    }
    
  }
  closeDialogBox(){
    this.isOpenDialogBox = false;  
  }

  isXml($event : any ){

    if($event == null ) return null;

    const file = $event.target.files[0];
    this.xmlFile = file;
    const name : string = file.name;

    if(name.split('.')[1] !== 'xml'){
      let input =<HTMLInputElement>document.getElementById('proyect')
      input.value = null;
    }
  }
}

