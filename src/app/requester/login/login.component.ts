import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginBtn:string = "Login";
  message:string = "";
  constructor(private router:Router, private database:DatabaseService, private loginService:LoginServiceService) { }
  loginForm = new FormGroup({
    "email": new FormControl("sajid320.sa@gmail.com", [Validators.required, Validators.email]),
    "password": new FormControl("123", [Validators.required]),
  })
  formData = new FormData();
  login(){
    this.loginBtn = "Please wait";
    this.formData.append("email", this.loginForm.value.email);
    this.formData.append("password", this.loginForm.value.password);
    this.database.loginUser(this.formData).subscribe({
      next:data=>{
        // console.warn(data);
        if(data.status == 1){
          this.loginBtn = "Login...";
          this.message = "Redirecting to user dashbaord";
          this.loginService.login(this.loginForm.value.email);
          setTimeout(()=>{
            this.router.navigate(['/user']);
          }, 3000)
        }else if(data.status==2){
          this.loginBtn = "Login";
          this.message = data.message;
        }else if(data.status==0) {
          this.loginBtn = "Login";
          this.message = data.message;
        }else {
          this.loginBtn = "Login";
          this.message = "Something wrong from backend service";
        } 
      },
      error:err=>{
        this.loginBtn = "Login";
        this.message = err.message;
      }
    })
    setTimeout(()=>{
      this.message = "";
    }, 3000)
  }
  ngOnInit(): void {
  }

}
