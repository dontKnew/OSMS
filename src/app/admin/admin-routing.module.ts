import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnloginGuard } from './services/unlogin.guard';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './services/login.guard';

const routes: Routes = [
  { path:'author', 
    component:LoginComponent,
    canActivate:[UnloginGuard],
    // data: { animation: 'openClosePage' }
   },
  { path:'dashboard', 
    component:AdminComponent, 
    canActivate:[LoginGuard],
    // data: { animation: 'openClosePage' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
