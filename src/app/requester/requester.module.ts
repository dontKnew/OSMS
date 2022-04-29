import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequesterRoutingModule } from './requester-routing.module';
import { RequesterComponent } from './requester/requester.component';
import { ProfileComponent } from './include/profile/profile.component';
import { SubmitrequestComponent } from './include/submitrequest/submitrequest.component';
import { ServicestatusComponent } from './include/servicestatus/servicestatus.component';
import { ChangepasswordComponent } from './include/changepassword/changepassword.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  
    RequesterComponent,
       ProfileComponent,
       SubmitrequestComponent,
       ServicestatusComponent,
       ChangepasswordComponent,
       LoginComponent
  ],
  imports: [
    CommonModule,
    RequesterRoutingModule,
    ReactiveFormsModule
  ]
})
export class RequesterModule { }
