import { Component, OnInit } from '@angular/core';
import { empty, map } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { authUser } from 'src/app/models/authUser';
import { __assign } from 'tslib';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  isLoggedIn : boolean = false;
  username : string = "";
  fotoBase64 : string = "";

  constructor(private _auth : AuthService , private _userService : UserService) {
    if(Object.entries(_auth.UserData).length == 0 ){
      this.isLoggedIn = false;
      console.log("np sesion");
    }else{
      console.log("session")
      this.isLoggedIn = true;
      const data = _auth.UserData;
      console.log(data.Token);
    }
  }

  

  logout(){
    this._auth.logout();

  }
  ngOnInit(): void {
  }

}
