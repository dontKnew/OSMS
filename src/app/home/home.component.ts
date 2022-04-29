import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userSubmitBtn:boolean= false;
  verifyEmailForm:boolean = false;
  trueOTP!:number;
  message:string = '';
  cmessage:string = '';
  registrationBtn:string = 'Sign Up';
  registrationBtn1:string = "Submit";

  contactBtn:string = "Send";
  constructor(private databaseService:DatabaseService) { }

  userForm = new FormGroup({
    "name": new FormControl("", [Validators.required]),
    "email": new FormControl("", [Validators.email]),
    "password": new FormControl("", [Validators.required]),
  })
  get name(){
    return this.userForm.get("name");
  }
  get email(){
    return this.userForm.get("email");
  }
  get password(){
    return this.userForm.get("password");
  }
  
  userEmail!:string;
  formData = new FormData();
  sentOTP(){
    this.registrationBtn = "Please Wait";
    this.userEmail = this.userForm.value.email;
    // this.trueOTP = Math.floor(Math.random() * 899999 + 100000);
    this.formData.append("email", this.userEmail);
    this.formData.append("name", this.userForm.value.name);
    this.formData.append("password", this.userForm.value.password);
    // this.formData.append("OTP", this.trueOTP.toString());
    this.databaseService.verifyEmail(this.formData).subscribe({
      next:data=>{
        this.registrationBtn = "Sign Up";
        if(data.status ==2 ){
          this.message = data.message;
        }else if(data[0][0].status ==1){
          this.verifyEmailForm = true;
          this.verifyUserForm.patchValue({"email":this.userEmail});
        }else {
          this.message = "Server side error occured";
        }
      },
      error:error=>{
        this.registrationBtn = "Sign Up";
        this.message = error.message;
      }
    })
    setTimeout(()=>{
      this.message = "";
    }, 3000);
  }
  verifyUserForm = new FormGroup({
    "email": new FormControl("", [Validators.email]),
    "OTP": new FormControl("", [Validators.required]),
  })
  get OTP(){
    return this.userForm.get("OTP");
  }

  newUser(){
    this.registrationBtn1 = "Please Wait";
    this.formData.append("OTP", this.verifyUserForm.value.OTP.toString());
    this.databaseService.newUser(this.formData).subscribe({
      next:data=>{
        console.warn(data);
        this.registrationBtn1 = "Submit";
        if(data.status == 0){
          this.message = data.message;
        }else if(data[1].post[0].status==1){
          this.verifyEmailForm = false;
          this.message = "Your Registration Successfull :)";
          this.userForm.reset();
        }else {
          this.message = "Server side error orrcured";
        }
      },
      error:error=>{
        this.registrationBtn1 = "Submit";
        this.message = error.message;
      }
    })
    setTimeout(()=>{
      this.message = "";
    }, 3000);
  }


  // Contact form 

  contactForm = new FormGroup({
    "cname": new FormControl("", [Validators.required]),
    "cemail": new FormControl("", [Validators.email, Validators.required]),
    "subject": new FormControl("", [Validators.required]),
    "body": new FormControl("", [Validators.required]),
  })
  // get cname(){
  //   return this.contactForm.get("cname");
  // }
  // get cemail(){
  //   return this.contactForm.get("cemail");
  // }
  // get subject(){
  //   return this.contactForm.get("subject");
  // }
  // get body(){
  //   return this.contactForm.get("body");
  // }
  
  contactEmail!:string;
  formContactData = new FormData();
  contactFormSubmit(){
    this.contactBtn = "Please Wait";
    this.contactEmail = this.contactForm.value.cemail;
    this.formContactData.append("email", this.contactEmail);
    this.formContactData.append("name", this.contactForm.value.cname);
    this.formContactData.append("subject", this.contactForm.value.subject);
    this.formContactData.append("message", this.contactForm.value.body);
    this.databaseService.sentMail(this.formContactData).subscribe({
      next:data=>{
        this.contactBtn = "Send";
        if(data.status == 2 ){
          this.cmessage = data.message;
        }else if(data[0][0].status ==1){
          this.cmessage = "Message sent, We'll contact you ASAP"
        }else {
          this.cmessage = "Server side error occured";
        }
      },
      error:error=>{
        this.contactBtn = "Send";
        this.cmessage = error.message;
      }
    })
    setTimeout(()=>{
      this.cmessage = "";
    }, 3000);
  }

  ngOnInit(): void {
    
  }

}
