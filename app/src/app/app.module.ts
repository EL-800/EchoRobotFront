import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { HomeComponent } from './Components/home/home.component';
import { LoggingComponent } from './Components/logging/logging.component';
import { JwtInterceptor } from './Security/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegistroComponent,
    HomeComponent,
    LoggingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,useClass:JwtInterceptor , multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
