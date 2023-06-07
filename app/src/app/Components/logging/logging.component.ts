import { Component, OnInit } from '@angular/core';
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

  login: LoggingUser = {
    email: "",
    password: ""
  };


  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  logging(){
    this._authService.logging(this.login).subscribe(
      {
        next: resp=>{
          console.log("Inicio correcto" + resp)
          this._router.navigate(['/'])
        },
        error: err =>{
          
        }
      }
    )
  }
/*S
  logging() {
    this._userService.logging(this.login).subscribe(res => {
      this._router.navigate(['/home'])
    },
      error => {
        console.log(error);
      }
    )
  }
*/

}
