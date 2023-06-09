import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _auth : AuthService , private _userService : UserService , private _router : Router) {
    
    this._auth.User.subscribe(res=>{
      const auth :authUser = res;
      this.username = auth.nombre
      this.isLoggedIn =!this.isLoggedIn;
    })
  }

  
  

  logout(){
    this._auth.logout();
    this._router.navigate(['/home'])
  }
  ngOnInit(): void {
  }

}
