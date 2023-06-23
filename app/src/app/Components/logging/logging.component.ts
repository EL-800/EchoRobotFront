import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Services/auth.service';
import { LoggingUser } from 'src/app/models/Logging.model';


@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  faEnvelope = faEnvelope;
  faLock = faLock;

  isFormValid : boolean = true;
  isOpenDialogBox : boolean = false;
  dialogMessage : string = "";
  formLogging: FormGroup = this.formBuilder.group({
    email : ['',[Validators.required,Validators.email]],
    password : ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private _authService: AuthService, private _router: Router, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }
  logging(){

    if(this.formLogging.valid){
      console.log("formulario correcto");
      const loggingData: FormData = new FormData();
      loggingData.append('email',this.formLogging.get("email").value)
      loggingData.append('password',this.formLogging.get('password').value);

      this._authService.logging(loggingData).subscribe({
        next: () => this._router.navigate(['/']),
        error: (response : Response) => {
          if(response.status == 401){
            this.dialogMessage = "Credenciales incorrectas favor de intertarlo de nuevo"
          }else if(response.status == 400){
            this.dialogMessage = "Hubo un problema con el servidor :("
          }
          else{
            this.dialogMessage="Error al iniciar Sesion"
          }
          this.isOpenDialogBox = true;
        }
      });
    }else{
      this.isFormValid = false;
    }
  }
  closeDialogBox(){
    this.isOpenDialogBox = false;
  }



}

