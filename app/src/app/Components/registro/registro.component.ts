import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import {faUser, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import { User } from 'src/app/models/User.model';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //icons
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;

  isFormValid : boolean = true;
  dialogMessage : string = "";
  isOpenDialogBox : boolean = false;

  formRegister : FormGroup = this.formBuilder.group({
    name : ['',[Validators.required]],
    lastName : ['',[Validators.required]],
    email : ['',[Validators.email,Validators.required]],
    password : ['',[Validators.minLength(6),Validators.required]]
  }) 

  constructor(private _userService : UserService , private _router:Router, private formBuilder : FormBuilder, private auth : AuthService) { }

  ngOnInit(): void {

    
  }
  Register(){

    if(this.formRegister.valid){
      const data : FormData = new FormData();
      data.append('Nombre',this.formRegister.get('name').value)
      data.append('Apellido',this.formRegister.get('lastName').value)
      data.append('Email',this.formRegister.get('email').value)
      data.append('Password',this.formRegister.get('password').value)

      this._userService.addUser(data).subscribe({
        next: ()=> {
          const login : FormData = new FormData();
          login.append('email', this.formRegister.get('email').value)
          login.append('password', this.formRegister.get('password').value)
          this.auth.logging(login).subscribe()
          this._router.navigate(['/'])
        },
        error: ()=>{
          this.dialogMessage = "Hubo un problema al registrarse, intenta de nuevo"
          this.isOpenDialogBox = true;
        }
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
}
