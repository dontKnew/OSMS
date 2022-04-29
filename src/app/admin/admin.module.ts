import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { WorkorderComponent } from './include/workorder/workorder.component';
import { RequestsComponent } from './include/requests/requests.component';
import { AssetsComponent } from './include/assets/assets.component';
import { TechnicianComponent } from './include/technician/technician.component';
import { RequesterComponent } from './include/requester/requester.component';
import { SellreportComponent } from './include/sellreport/sellreport.component';
import { WorkreportComponent } from './include/workreport/workreport.component';
import { ChangepasswordComponent } from './include/changepassword/changepassword.component';


@NgModule({
  declarations: [
    LoginComponent,
    AdminComponent,
    WorkorderComponent,
    RequestsComponent,
    AssetsComponent,
    TechnicianComponent,
    RequesterComponent,
    SellreportComponent,
    WorkreportComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
