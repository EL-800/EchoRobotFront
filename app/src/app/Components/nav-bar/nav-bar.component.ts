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
  imgUrl : string = "";
  iniciales : string = "";

  constructor(private _auth : AuthService , private _userService : UserService , private _router : Router) {
    
    this._auth.User.subscribe(res=>{
      if(Object.entries(res).length != 0){
        const auth :authUser = res;
        this.username = auth.nombre
        this.imgUrl = res.urlFoto;
        this.iniciales = this.username.charAt(0).toUpperCase() + res.apellido.charAt(0).toUpperCase();
        this.isLoggedIn =!this.isLoggedIn;
      }
      else{
        this.isLoggedIn = false;
      }
    })
  }

  

  logout(){
    this._auth.logout();
    this._router.navigate(['/home'])
  }
  ngOnInit(): void {
  }

}
