import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.css']
})
export class RequesterComponent implements OnInit {

  profile:boolean = true;
  submitRequest:boolean = false;
  serviceStatus:boolean = false;
  changePassword:boolean = false;
  constructor(private loginService:LoginServiceService, private router:Router, private database:DatabaseService) { }

  Profile(){
    this.profile = true;
    this.submitRequest = false;
    this.serviceStatus = false;
    this.changePassword = false;
  }

  SubmitRequest(){
    this.profile = false;
    this.submitRequest = true;
    this.serviceStatus = false;
    this.changePassword = false;
  }

  ServiceStatus(){
    this.profile = false;
    this.submitRequest = false;
    this.serviceStatus = true;
    this.changePassword = false;
  }

  ChangePassword(){
    this.profile = false;
    this.submitRequest = false;
    this.serviceStatus = false;
    this.changePassword = true;
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.loginService.userData();
    // this.Profile();
    if(this.loginService.isLogin()){
      this.router.navigate(['/user']);
    }else {
      this.router.navigate(['/login']);
    }
  }

}
