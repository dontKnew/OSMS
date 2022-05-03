import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  
  noData:boolean = false;
  message:string = '';
  RequestData:any | boolean;
  assignDetails:boolean = false;
  singleRequest: any | boolean;
  assignBtn:string = "Submit";
  
  constructor(private database:DatabaseService) { }

  assignWorkForm = new FormGroup({
    "requestid":new FormControl("", [Validators.required]),
    "requestinfo":new FormControl("", [Validators.required]),
    "requestdesc": new FormControl("", [Validators.required]),
    "requestername": new FormControl("", [Validators.required]),
    "requesteradd1": new FormControl("", [Validators.required]),
    "requesteradd2": new FormControl("", [Validators.required]),
    "requestercity": new FormControl("", [Validators.required]),
    "requesterstate": new FormControl("", [Validators.required]),
    "requesterzip": new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "requesteremail": new FormControl("", [Validators.required, Validators.email]),
    "requestermobile": new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(13),Validators.minLength(10)]),
    "requestdate": new FormControl("", [Validators.required]),
    "assigntech": new FormControl("", [Validators.required]),
  })

  get requestid (){
    return this.assignWorkForm.get("requestid");
  }
  get requestinfo (){
    return this.assignWorkForm.get("requestinfo");
  }
  get requestdesc (){
      return this.assignWorkForm.get("requestdesc");
  }
  get requestername (){
      return this.assignWorkForm.get("requestername");
  }
  get requesteradd1 (){
      return this.assignWorkForm.get("requesteradd1");
  }
  get requesteradd2 (){
      return this.assignWorkForm.get("requesteradd2");
  }
  get requestercity (){
      return this.assignWorkForm.get("requestercity");
  }
  get requesterstate (){
      return this.assignWorkForm.get("requesterstate");
  }
  get requesterzip (){
      return this.assignWorkForm.get("requesterzip");
  }
  get requesteremail (){
      return this.assignWorkForm.get("requesteremail");
  }
  get requestermobile (){
      return this.assignWorkForm.get("requestermobile");
  }
  get requestdate (){
      return this.assignWorkForm.get("requestdate");
  }
  get assigntech (){
    return this.assignWorkForm.get("assigntech");
  }
  formData = new FormData();
  assignWork(){
    this.assignBtn = "Please wait";
    this.formData.append("requestid",this.assignWorkForm.value.requestid);
    this.formData.append("requestinfo",this.assignWorkForm.value.requestinfo);
    this.formData.append("requestdesc",this.assignWorkForm.value.requestdesc);
    this.formData.append("requestername",this.assignWorkForm.value.requestername);
    this.formData.append("requesteradd1",this.assignWorkForm.value.requesteradd1);
    this.formData.append("requesteradd2",this.assignWorkForm.value.requesteradd2);
    this.formData.append("requestercity",this.assignWorkForm.value.requestercity);
    this.formData.append("requesterstate",this.assignWorkForm.value.requesterstate);
    this.formData.append("requesterzip",this.assignWorkForm.value.requesterzip);
    this.formData.append("requesteremail",this.assignWorkForm.value.requesteremail);
    this.formData.append("requestermobile",this.assignWorkForm.value.requestermobile);
    this.formData.append("assigntech",this.assignWorkForm.value.assigntech);
    this.formData.append("requestdate",this.assignWorkForm.value.requestdate);
    this.database.newAssignWork(this.formData).subscribe({
    next:data=>{
      console.warn(data);
      this.assignBtn = "Submit";
      if(data[1].post[0].status==1){
        // window.scroll({ top: 0, left: 0, behavior: 'smooth'});
          this.message = "Work Assigned Successfully";
          this.deleteRequest(this.assignWorkForm.value.requestid);
      }else if(data[1].post[0].status==0){
        this.message = "Unable to submit request";
      }else {
        this.message = "Server response error";
      }
    }, 
    error:error=>{
      this.message = error.message;
      this.assignBtn = "Submit";
    }
  })
  setTimeout(()=>{
    this.message = '';
  }, 5000);
  }

  getRequest(){
    this.database.getSubmittedRequest().subscribe({
    next:data=>{
      // console.warn(data);
      if(data[1].get[0].data== 0){
        this.RequestData = false;
        this.noData = true;
      }else if(data[1].get[0].status == 1){
        this.RequestData = data[1].get[0].data;
      }else {
        this.message = "Server response error";
      }
    }, 
    error:error=>{
      this.message = error.message;
    }
  })
}
  closeAssign(){
    this.assignDetails = false; 
  }
  viewRequest(id:number){
    this.database.getSingleSubmittedRequest(id).subscribe({
      next:data=>{
        if(data[1].get[0].data== 0){
        }else if(data[1].get[0].status == 1){
          // this.singleRequestData = data[1].get[0].data[0];
          this.assignWorkForm.patchValue({
            "requestid":data[1].get[0].data[0].request_id,
            "requestinfo":data[1].get[0].data[0].request_info,
            "requestdesc":data[1].get[0].data[0].request_desc,
            "requestername":data[1].get[0].data[0].requester_name,
            "requesteradd1":data[1].get[0].data[0].requester_add1,
            "requesteradd2":data[1].get[0].data[0].requester_add2,
            "requestercity":data[1].get[0].data[0].requester_city,
            "requesterstate":data[1].get[0].data[0].requester_state,
            "requesterzip":data[1].get[0].data[0].requester_zip,
            "requesteremail":data[1].get[0].data[0].requester_email,
            "requestermobile":data[1].get[0].data[0].requester_mobile,
            "assigntech":data[1].get[0].data[0].assign_tech,
            // "assigndate":formatData(data[1].get[0].data[0].assign_date)
            // "assigndate":formatDate(data[1].get[0].data[0].assign_date, 'yyyy-MM-dd','en')
          })
        }else {
          this.message = "Server response error";
        }
      }, 
      error:error=>{
        this.message = error.message;
      }
    })
  }

  deleteRequest(id:number){
    this.database.deleteRequest(id).subscribe({
      next:data=>{
        console.warn(data);
        if(data[1].delete[0].status == 1){
          this.message = "request has been deleted";
          this.getRequest();
        }if(data[1].delete[0].status == 0){
          this.message = "request could not delete8";
          this.getRequest();
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

  technicianData:any;

  getTechnician(){
    this.database.getTechnician().subscribe({
    next:data=>{
      console.warn(data);
      if(data[1].get[0].data == 0){
        this.technicianData = false;
      }else if(data[1].get[0].status == 1){
        this.technicianData = data[1].get[0].data;
      }else {
        this.message = "Server response error";
      }
    }, 
    error:error=>{
      this.message = error.message;
    }
  })
}
  
  ngOnInit(): void {
    this.getRequest();
    this.getTechnician();
  }
}
