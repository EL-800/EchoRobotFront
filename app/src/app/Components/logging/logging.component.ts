import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/Services/user.service';
import { LoggingUser } from 'src/app/models/Logging.model';


@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  faEnvelope = faEnvelope;
  faLock = faLock;

  login : LoggingUser ={
    email: "",
    password : ""
  };


  constructor(private _userService: UserService, private _router : Router) { }

  ngOnInit(): void {
  }

  logging(){
    this._userService.logging(this.login).subscribe(res=>{
      this._router.navigate(['/home'])
    },
    error=>{
      console.log(error); 
    }
    )
  }


}
