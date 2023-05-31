import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import {faUser, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'

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
  Nombre : string  ="";
  Apellido : string = "";
  Email : string  = "";
  Password : string = "";

  constructor(private _userService : UserService) { }

  ngOnInit(): void {

    
  }


}
