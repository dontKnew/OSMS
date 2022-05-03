import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RequesterRoutingModule } from './requester/requester-routing.module';
import { RequesterModule } from './requester/requester.module';
import { HttpClientModule} from '@angular/common/http';
import { MainComponent } from './testing/main/main.component';
import { Col1Component } from './testing/col1/col1.component';
import { Col2Component } from './testing/col2/col2.component';
import { Col3Component } from './testing/col3/col3.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    Col1Component,
    Col2Component,
    Col3Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RequesterModule,
    RequesterRoutingModule,
    AdminModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
