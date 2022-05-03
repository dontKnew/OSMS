import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './testing/main/main.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'', component:HomeComponent},
  {path:'testing', component:MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,anchorScrolling: 'enabled'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
