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
  emailVerifyBtn:string = "Send OTP";
  verifyBtn:string = "Submit";
  message:string = "";

  loginTable:boolean = false;
  emailTable:boolean = false;
  verifyTable:boolean = false;



  constructor(private router:Router, private database:DatabaseService, private loginService:LoginServiceService) { }
  
  
  backToTable(tab:string){
    if(tab=="emailTable"){
      this.loginTable = false;
      this.emailTable = true;
      this.verifyTable = false;
    }else if(tab=="loginTable"){
      this.loginTable = true;
      this.emailTable = false;
      this.verifyTable = false;
    }else if(tab=="verifyTable"){
      this.loginTable = false;
      this.emailTable = false;
      this.verifyTable = true;
    }
  }
  
  loginForm = new FormGroup({
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required]),
  })

  get email(){
    return this.loginForm.get("email");
  }
  get password(){
    return this.loginForm.get("password");
  }

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
          this.loginService.userData();
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

  // SENT OTP
  checkEmailForm = new FormGroup({
    "email1": new FormControl("", [Validators.email, Validators.required]),
  });

  get email1(){
    return this.checkEmailForm.get("email1");
  }
  
  userEmail!:string;
  sentOTP(){
    this.emailVerifyBtn = "Please Wait";
    this.userEmail = this.checkEmailForm.value.email1;
    this.formData.append("email", this.checkEmailForm.value.email1);
    this.database.sentOTP(this.formData).subscribe({
      next:data=>{
        console.warn("Your sent OTP Response : ", data);
        if(data.status == 2 ){
          this.message = data.message;
          this.emailVerifyBtn = "Send OTP";
        }else if(data[0][0].status ==1){
          this.emailVerifyBtn = "Sent!";
          this.backToTable("verifyTable");
          this.verifyForm.patchValue({"email2":this.userEmail});
        }else {
          this.message = "Server side error occured";
          this.emailVerifyBtn = "Send OTP";
        }
      },
      error:error=>{
        this.emailVerifyBtn = "Send OTP";
        this.message = error.message;
      }
    })
    setTimeout(()=>{
      this.message = "";
    }, 3000);
  }


  verifyForm = new FormGroup({
    "email2": new FormControl("", [Validators.email, Validators.required]),
    "otp2": new FormControl("", [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
    "password2": new FormControl("", [Validators.required]),
  });

  get otp2(){
    return this.verifyForm.get("otp2");
  }
  get email2(){
    return this.verifyForm.get("email2");
  }
  get password2(){
    return this.verifyForm.get("password2");
  }

  verifyOTP(){
    this.verifyBtn = "Please Wait";
    this.formData.append("OTP", this.verifyForm.value.otp2.toString());
    this.formData.append("email", this.verifyForm.value.email2);
    this.formData.append("password", this.verifyForm.value.password2);
    this.database.changePass(this.formData).subscribe({
      next:data=>{
        console.warn(data);
        this.verifyBtn = "Submit";
        if(data.status == 0 || data.status == 2 ){
          this.message = data.message;
        }else if(data[0].update[0].status==1){
          setTimeout(()=>{
            this.backToTable("loginTable");
          },3000);
          this.message = "Password changed successfully!";
          this.verifyForm.reset();
        }else {
          this.message = "Server side error orrcured";
        }
      },
      error:error=>{
        this.verifyBtn = "Submit";
        this.message = error.message;
      }
    })
    setTimeout(()=>{
      this.message = "";
    }, 3000);
  }

  ngOnInit(): void {
    this.backToTable("loginTable");

  }

}
