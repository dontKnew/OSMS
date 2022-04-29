import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginBtn:string = "Login";
  message:string = "";
  constructor(private router:Router, private database:DatabaseService, private loginService:LoginService) { }

  loginForm = new FormGroup({
    "email": new FormControl("admin@gmail.com", [Validators.required, Validators.email]),
    "password": new FormControl("123456", [Validators.required]),
  })
  
  formData = new FormData();
  login(){
    this.loginBtn = "Please wait";
    this.formData.append("email", this.loginForm.value.email);
    this.formData.append("password", this.loginForm.value.password);
    this.database.loginAdmin(this.formData).subscribe({
      next:data=>{
        console.warn(data);
        if(data.status == 1){
          this.loginBtn = "Login...";
          this.message = "Redirecting to admin dashbaord";
          this.loginService.login(this.loginForm.value.email);
          setTimeout(()=>{
            this.router.navigate(['/dashboard']);
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
