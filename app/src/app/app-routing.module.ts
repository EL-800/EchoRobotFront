import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './Components/registro/registro.component';
import { HomeComponent } from './Components/home/home.component';
import { LoggingComponent } from './Components/logging/logging.component';
import { HomeComunityComponent } from './Components/Comunity/home-comunity/home-comunity.component';
import { AddPulicationComponent } from './Components/Comunity/add-pulication/add-pulication.component';
import { PublicationComponent } from './Components/Comunity/publication/publication.component';
import { AuthGuard } from './Security/auth.guard';
import { UserGuard } from './Security/user.guard';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:"registro", component:RegistroComponent, canActivate:[UserGuard]},
  {path:"auth/logging",component:LoggingComponent, canActivate:[UserGuard]},
  {path:"comunity",component:HomeComunityComponent},
  {path: "comunity/AddPublication",component:AddPulicationComponent,canActivate:[AuthGuard]},
  {path: "comunity/Publication/:id",component:PublicationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
