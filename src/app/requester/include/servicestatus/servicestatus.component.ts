import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginServiceService } from '../../login-service.service';

@Component({
  selector: 'app-servicestatus',
  templateUrl: './servicestatus.component.html',
  styleUrls: ['./servicestatus.component.css']
})
export class ServicestatusComponent implements OnInit {

  searchBtn:string = "Search";
  message:string = "";
  showStatus:boolean = false;
  
  requestid!:number; 
  requestinfo!:string; 
  requestdesc!:string; 
  requestername!:string; 
  requesteradd1!:string; 
  requesteradd2!:string; 
  requestercity!:string; 
  requesterstate!:string; 
  requesterzip!:number; 
  requesteremail!:string; 
  requestermobile!:number; 
  requestdate!:any; 
  
  constructor(private database:DatabaseService, private loginService:LoginServiceService) { }

  searchForm = new FormGroup({
    "searchid":  new FormControl("", [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
  });

  searchRequest(){
    console.warn(this.searchForm.value.searchid);
    this.searchBtn = "Searching...";
    this.database.requestStatus(this.searchForm.value.searchid).subscribe({
      next:data=>{
        console.warn(data);
        if(data[1].get[0].data==0){
          // this.message = "Request Submitted. Your Request_Id : " + data[1].post[0].lastId;
          this.message = "This service request ID - " +this.searchForm.value.searchid+" does not exist";
        }else if(data[1].get[0].data){
          this.requestid = data[1].get[0].data[0].request_id; 
          this.requestinfo = data[1].get[0].data[0].request_info; 
          this.requestdesc = data[1].get[0].data[0].request_desc; 
          this.requestername = data[1].get[0].data[0].requester_name; 
          this.requesteradd1 = data[1].get[0].data[0].requester_add1; 
          this.requesteradd2 = data[1].get[0].data[0].requester_add2; 
          this.requestercity = data[1].get[0].data[0].requester_city; 
          this.requesterstate = data[1].get[0].data[0].requester_state; 
          this.requesterzip = data[1].get[0].data[0].requester_zip; 
          this.requesteremail = data[1].get[0].data[0].requester_email; 
          this.requestermobile = data[1].get[0].data[0].requester_mobile; 
          this.requestdate = data[1].get[0].data[0].assign_date; 
          this.showStatus = true; 
          this.searchForm.reset();
        }else if(data[1].get[0].status==0){
          window.scroll({ top: 0, left: 0, behavior: 'smooth'});
          this.message = "Unable to search request";
        }else {
          window.scroll({ top: 0, left: 0, behavior: 'smooth'});
          this.message = "Server response error";
        } 
        this.searchBtn = "Search";
      },
      error:err=>{
        this.searchBtn = "Search";
        this.message = err.message;
      }
    })
    setTimeout(()=>{
      this.message = "";
    }, 3000)
  }
  closeStatus(){
    this.showStatus = false;
  }

  ngOnInit(): void {
  }

}
