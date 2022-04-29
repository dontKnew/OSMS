import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  message:string = '';
  updateBtn:string = "Update";
  
  constructor(private database:DatabaseService, public login:LoginService) { }

  changePassForm = new FormGroup({
    "aEmail" : new FormControl("", [Validators.required,Validators.email]),
    "aPassword" : new FormControl("", [Validators.required]),
  })
  
  formData = new FormData();
  changePass(){
    this.updateBtn = "Please Wait";
    this.formData.append("aPassword",this.changePassForm.value.aPassword);
    this.formData.append("aEmail",this.changePassForm.value.aEmail);
    this.database.adminChange(this.formData).subscribe({
    next:data=>{
      console.warn(data);
      this.updateBtn = "Update";
      if(data[1].update[0].status== 0){
        this.message = "Password could not update";
      }else if(data[1].update[0].status == 1){
        this.message  = "Password has been changed";
      }else {
        this.message = "Server response error";
      }
    }, 
    error:error=>{
      this.updateBtn = "Update";
      this.message = error.message;
    }
  })
 }
  ngOnInit(): void {
    this.changePassForm.patchValue({"aEmail":this.login.adminEmail});
  }

}
