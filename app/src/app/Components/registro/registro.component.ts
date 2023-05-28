import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  Nombre : string  ="";
  Apellido : string = "";
  Email : string  = "";
  Password : string = "";

  constructor(private _userService : UserService) { }

  ngOnInit(): void {

    
  }


}
