import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginServiceService } from '../../login-service.service';

@Component({
  selector: 'app-submitrequest',
  templateUrl: './submitrequest.component.html',
  styleUrls: ['./submitrequest.component.css']
})
export class SubmitrequestComponent implements OnInit {

  message:string = '';
  submitBtn:string = "Submit";

  showStatus:boolean = false;

  requestid1:number = 0;
  requestinfo1!:string; 
  requestdesc1!:string; 
  requestername1!:string; 
  requesteradd11!:string; 
  requesteradd21!:string; 
  requestercity1!:string; 
  requesterstate1!:string; 
  requesterzip1!:number; 
  requesteremail1!:string; 
  requestermobile1!:number; 
  requestdate1!:any; 
  
  constructor(public loginService:LoginServiceService, private database:DatabaseService) { }

  submitRequest = new FormGroup({
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
  })

  get requestinfo (){
    return this.submitRequest.get("requestinfo");
  }
  get requestdesc (){
      return this.submitRequest.get("requestdesc");
  }
  get requestername (){
      return this.submitRequest.get("requestername");
  }
  get requesteradd1 (){
      return this.submitRequest.get("requesteradd1");
  }
  get requesteradd2 (){
      return this.submitRequest.get("requesteradd2");
  }
  get requestercity (){
      return this.submitRequest.get("requestercity");
  }
  get requesterstate (){
      return this.submitRequest.get("requesterstate");
  }
  get requesterzip (){
      return this.submitRequest.get("requesterzip");
  }
  get requesteremail (){
      return this.submitRequest.get("requesteremail");
  }
  get requestermobile (){
      return this.submitRequest.get("requestermobile");
  }
  get requestdate (){
      return this.submitRequest.get("requestdate");
  }
  formData = new FormData();
  SubmitRequest(){
    this.submitBtn = "Please wait";
    this.formData.append("requestinfo",this.submitRequest.value.requestinfo);
    this.formData.append("requestdesc",this.submitRequest.value.requestdesc);
    this.formData.append("requestername",this.submitRequest.value.requestername);
    this.formData.append("requesteradd1",this.submitRequest.value.requesteradd1);
    this.formData.append("requesteradd2",this.submitRequest.value.requesteradd2);
    this.formData.append("requestercity",this.submitRequest.value.requestercity);
    this.formData.append("requesterstate",this.submitRequest.value.requesterstate);
    this.formData.append("requesterzip",this.submitRequest.value.requesterzip);
    this.formData.append("requesteremail",this.submitRequest.value.requesteremail);
    this.formData.append("requestermobile",this.submitRequest.value.requestermobile);
    this.formData.append("requestdate",this.submitRequest.value.requestdate);
    this.database.submitRequest(this.formData).subscribe({
    next:data=>{
      console.warn(data);
      this.submitBtn = "Submit";
      if(data[1].post[0].status==1){
        this.showStatus = true;
        window.scroll({ top: 0, left: 0, behavior: 'smooth'});
        // this.message = "Request Submitted. Your Request_Id : " + data[1].post[0].lastId;
        this.requestid1 = data[1].post[0].lastId;
        
        this.requestinfo1 = this.submitRequest.value.requestinfo;
        this.requestdesc1 = this.submitRequest.value.requestdesc;
        this.requestername1 = this.submitRequest.value.requestername;
        this.requesteradd11 = this.submitRequest.value.requesteradd1;
        this.requesteradd21 = this.submitRequest.value.requesteradd2;
        this.requestercity1 = this.submitRequest.value.requestercity;
        this.requesterstate1 = this.submitRequest.value.requesterstate;
        this.requesterzip1 = this.submitRequest.value.requesterzip;
        this.requesteremail1 = this.submitRequest.value.requesteremail;
        this.requestermobile1 = this.submitRequest.value.requestermobile;
        this.requestdate1 = this.submitRequest.value.requestdate;
        this.submitRequest.reset();
      }else if(data[1].post[0].status==0){
        this.message = "Unable to submit request";
      }else {
        this.message = "Server response error";
      }
    }, 
    error:error=>{
      this.message = error.message;
      this.submitBtn = "Submit";
    }
  })
  setTimeout(()=>{
    this.message = '';
  }, 5000);
  }

  resetForm(){
    this.submitRequest.reset();
  }

  ngOnInit(): void {

  }

}
