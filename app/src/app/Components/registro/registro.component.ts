import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import {faUser, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import { User } from 'src/app/models/User.model';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

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

  //datos del formulario

  Usuario: User = {
    Nombre: '',
    Apellido: '',
    Email: '',
    Password: '',
    idUsuario: 0,
    Foto: ''
  }
  constructor(private _userService : UserService , private _router:Router) { }

  ngOnInit(): void {

    
  }
  Register(){

    this._userService.addUser(this.Usuario).subscribe(response =>{
      if(response.exito === 1){
        
        this._router.navigate(['/home']);
      }else{
        console.log("error");
      }
    });
  }

}
