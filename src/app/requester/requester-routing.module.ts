import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { RequesterComponent } from './requester/requester.component';
import { UnloginGuard } from './unlogin.guard';

const routes: Routes = [
  {path:'user', component:RequesterComponent, canActivate:[LoginGuard]},
  {path:'login', component:LoginComponent, canActivate:[UnloginGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequesterRoutingModule { }
