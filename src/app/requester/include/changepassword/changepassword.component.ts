import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginServiceService } from '../../login-service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  message:string = '';
  updateBtn:string = "Update";
  
  constructor(public loginService:LoginServiceService, private database:DatabaseService) { 
    this.changePassForm.patchValue({"email":this.loginService.userEmail});
  }

  changePassForm = new FormGroup({
    "email":new FormControl("", [Validators.email, Validators.required]),
    "oldPassword": new FormControl("", [Validators.required]),
    "newPassword": new FormControl("", [Validators.required]),
    "confirmPassword": new FormControl("", [Validators.required])
  })
  
  formData = new FormData();
  ChangePassword(){
    this.updateBtn = "Please wait";
    if(this.changePassForm.value.newPassword == this.changePassForm.value.confirmPassword){
        this.formData.append("oldPassword",this.changePassForm.value.oldPassword);
        this.formData.append("newPassword",this.changePassForm.value.oldPassword);
        this.formData.append("id",this.loginService.userId.toString());
        this.database.changePassword(this.formData).subscribe({
        next:data=>{
          this.updateBtn = "Update";
          if(data.status == 2){
            this.message = data.message;
          }else if(data.status == 3){
            this.message = data.message;
          }else if(data[0].update[0].status == 1){
            this.message = "Password changed successfully";
            this.loginService.userData();
          }else if(data[0].update[0].status == 0){
            this.message = data.message;
          }else {
            this.message = "Server response error";
          }
        }, 
        error:error=>{
          this.message = error.message;
          this.updateBtn = "Update";
        }
      })
    }else {
      this.message = "Please enter the same password";
      this.updateBtn = "Update";
    }
    setTimeout(()=>{
      this.message = '';
    }, 3000);
}

    
  ngOnInit(): void {

  }
}
