import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.css']
})
export class RequesterComponent implements OnInit {

  requesterData:any;
  requesterSingleData:any;
  message:string = ''

  showTable:boolean = false;
  editTable:boolean = false;
  addTable:boolean = false;
  doubleTable:boolean = false;

  updateBtn:string = "Update";
  addBtn:string = "Submit";

  constructor(private database:DatabaseService) { }

  backToTable(tab:string){
    if("showTable"==tab){
      this.showTable = true;
      this.editTable = false;
      this.doubleTable = false;
      this.addTable = false;
    }else if("editTable"==tab){
      this.showTable = false;
      this.editTable = true;
      this.doubleTable = true;
    }
    else if("addTable"==tab){
      this.showTable = false;
      this.editTable = false;
      this.addTable = true;
      this.doubleTable = true;
    }
}

  getRequester(){
    this.database.getRequester().subscribe({
    next:data=>{
      // console.warn(data);
      if(data[1].get[0].data== 0){
        this.requesterData = false;
      }else if(data[1].get[0].status == 1){
        this.requesterData = data[1].get[0].data;
      }else {
        this.message = "Server response error";
      }
    }, 
    error:error=>{
      this.message = error.message;
    }
  })
}

  deleteRequester(id:number){
    this.database.deleteRequester(id).subscribe({
      next:data=>{
        // console.warn(data);
        if(data[1].delete[0].status == 1){
          this.message = "One Requester has been deleted";
          this.getRequester();
          this.message = "Requester could not delete";
        }else {
          this.message = "Server response error";
        }
      }, 
      error:error=>{
        this.message = error.message;
      }
    })
    setTimeout(()=>{
      this.message = '';
    }, 3000);
  }

  requesterForm = new  FormGroup({
    "r_login_id": new FormControl("1", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "r_name": new FormControl("", [Validators.required]),
    "r_email": new FormControl("", [Validators.required, Validators.email]),
    "r_password": new FormControl("''", [Validators.required])
  })

  viewRequester(id:number){
    this.backToTable("editTable");
    this.database.getSingleRequester(id).subscribe({
      next:data=>{
        // console.warn(data);
        if(data[1].get[0].data== 0){
          console.warn("single request could not get");
        }else if(data[1].get[0].status == 1){
        this.requesterForm.patchValue({
          "r_login_id":data[1].get[0].data[0].r_login_id,
          "r_name":data[1].get[0].data[0].r_name,
          "r_email":data[1].get[0].data[0].r_email,  
        });
        }else {
          this.message = "Server response error";
        }
      }, 
      error:error=>{
        this.message = error.message;
      }
    })
  }

  get r_login_id(){
    return this.requesterForm.get("r_login_id");
  }
  get r_name(){
    return this.requesterForm.get("r_name");
  }
  get r_email(){
    return this.requesterForm.get("r_email");
  }
  get r_password(){
    return this.requesterForm.get("r_password");
  }

  formData = new FormData();
  updateRequester(){
    this.updateBtn = "Please Wait";
    this.formData.append("r_login_id", this.requesterForm.value.r_login_id.toString());
    this.formData.append("r_name", this.requesterForm.value.r_name);
    this.formData.append("r_email", this.requesterForm.value.r_email);
    this.database.updateRequester(this.formData).subscribe({
      next:data=>{
        console.warn(data);
        this.updateBtn = "Update";
        if(data[1].update[0].status==1){
          // window.scroll({ top: 0, left: 0, behavior: 'smooth'});
          this.message = "Requester Data Updated";
          // this.requesterForm.reset();
          // this.requesterForm.patchValue({"r_password":1, "r_login_id":1});
          this.getRequester();
        }else if(data[1].update[0].status==0){
          this.message = "Requester Data could not updated";
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
    }, 5000);
  }

  addRequester(){
    this.addBtn = "Please Wait";
    this.formData.append("r_name", this.requesterForm.value.r_name);
    this.formData.append("r_email", this.requesterForm.value.r_email);
    this.formData.append("r_password", this.requesterForm.value.r_password);
    this.database.addRequester(this.formData).subscribe({
      next:data=>{
        console.warn(data);
        this.addBtn = "Submit";
        if(data[1].post[0].status==1){
          this.message = "New Requester Added";
          // this.requesterForm.reset();
          // this.requesterForm.patchValue({"r_password":1, "r_login_id":1})
          // this.getRequester();
        }else if(data[1].post[0].status==0){
          this.message = "Requester could not added";
        }else {
          this.message = "Server response error";
        }
      }, 
      error:error=>{
        this.message = error.message;
        this.addBtn = "Submit";
      }
    })
    setTimeout(()=>{
      this.message = '';
    }, 5000);
  }

  ngOnInit(): void {
    console.warn("componet laoded requesetre");
    this.getRequester();
    this.backToTable("showTable");
  }

}
