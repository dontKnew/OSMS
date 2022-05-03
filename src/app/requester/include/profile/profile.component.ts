import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginServiceService } from '../../login-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  message:string = '';
  updateBtn:string = "Update";
  
  constructor(public loginService:LoginServiceService, private database:DatabaseService) { 
    this.loginService.userData();
    this.changeName.setValue({"name":this.loginService.userName, "email":this.loginService.userEmail});
  }

  changeName = new FormGroup({
    "email":new FormControl("", [Validators.email, Validators.required]),
    "name": new FormControl("", [Validators.required])
  })
  
  formData = new FormData();
  ChangeName(){
    this.updateBtn = "Please wait";
    this.formData.append("name",this.changeName.value.name);
    this.formData.append("id",this.loginService.userId.toString());
    console.warn(this.formData);
    this.database.changeName(this.formData).subscribe({
    next:data=>{
      console.warn(data);
      this.updateBtn = "Update";
      if(data.status = 1){
        this.message = "Name changed successfully";
        this.loginService.userData();
      }else if(data.status = 0){
        this.message = "Name could not change";
      }else {
        this.message = "Server response error";
      }
    }, 
    error:error=>{
      this.message = error.message;
      this.updateBtn = "Update";
    }
  })
  setTimeout(()=>{
    this.message = '';
  }, 3000);
}

  ngOnInit(): void {
    console.warn("profile component loaded");
  }

}
