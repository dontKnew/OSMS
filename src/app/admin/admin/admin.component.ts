import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/app.animation';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations:[slideInAnimation]
})
export class AdminComponent implements OnInit {

  dashboard:boolean = false;
  work:boolean = false;
  requests:boolean = false;
  assets:boolean = false;
  technician:boolean = false;
  requester:boolean = false;
  sellreport:boolean = false;
  workreport:boolean = false;
  changepass:boolean = false;

  totalRequester:number = 0;
  totalAssigned:number = 0;
  totalTechnician:number = 0;

  requesterData:any | boolean;
  message:string = '';

  constructor(public loginSerivce:LoginService, private database:DatabaseService) { }

  showTab(tabName:string){
    if(tabName=="dashboard"){
      this.dashboard = true;
      this.work = false;
      this.requests = false;
      this.assets = false;
      this.technician = false;
      this.requester = false;
      this.sellreport = false;
      this.workreport = false;
      this.changepass = false;
    }else if(tabName == "work"){
        this.work = true;
        this.dashboard = false;
        this.requests = false;
        this.assets = false;
        this.technician = false;
        this.requester = false;
        this.sellreport = false;
        this.workreport = false;
        this.changepass = false;
      }else if(tabName =="requests"){
        this.requests = true;
        this.dashboard = false;
        this.work = false;
        this.assets = false;
        this.technician = false;
        this.requester = false;
        this.sellreport = false;
        this.workreport = false;
        this.changepass = false;
      }else if(tabName =="assets"){
      this.dashboard = false;
      this.work = false;
      this.requests = false;
      this.assets = true;
      this.technician = false;
      this.requester = false;
      this.sellreport = false;
      this.workreport = false;
      this.changepass = false;
      }else if(tabName =="technician"){
        this.technician = true;
        this.dashboard = false;
        this.work = false;
        this.requests = false;
        this.assets = false;
        this.requester = false;
        this.sellreport = false;
        this.workreport = false;
        this.changepass = false;
      }else if(tabName == "requester"){
      this.dashboard = false;
      this.work = false;
      this.requests = false;
      this.assets = false;
      this.technician = false;
      this.requester = true;
      this.sellreport = false;
      this.workreport = false;
      this.changepass = false;
      }else if(tabName == "sellreport"){
      this.dashboard = false;
      this.work = false;
      this.requests = false;
      this.assets = false;
      this.technician = false;
      this.requester = false;
      this.sellreport = true;
      this.workreport = false;
      this.changepass = false;
      }else if(tabName == "workreport"){
      this.dashboard = false;
      this.work = false;
      this.requests = false;
      this.assets = false;
      this.technician = false;
      this.requester = false;
      this.sellreport = false;
      this.workreport = true;
      this.changepass = false;
      }else if(tabName == "changepass"){
      this.dashboard = false;
      this.work = false;
      this.requests = false;
      this.assets = false;
      this.technician = false;
      this.requester = false;
      this.sellreport = false;
      this.workreport = false;
      this.changepass = true;
      }
  }

  getRequester(){
    this.database.getRequester().subscribe({
      next:data=>{
        console.warn(data[1].get[0].data);
        if(data[1].get[0].data== 0){
          this.requesterData = false;
        }else if(data[1].get[0].status == 1){
          this.requesterData = data[1].get[0].data;
          this.totalRequester = data[1].get[0].totalRow;
          // console.warn(data[1].get[0].data)
        }else {
          this.message = "Server response error";
        }
      }, 
      error:error=>{
        this.message = error.message;
      }
    })
  }

  getTechnician(){
    this.database.getTechnician().subscribe({
      next:data=>{
        // console.warn("yoru tech", data);
        if(data[1].get[0].data == 0){
        }else if(data[1].get[0].status == 1){
          this.totalTechnician = data[1].get[0].totalRow;
        }else {
          this.message = "Server response error";
        }
      }, 
      error:error=>{
        this.message = error.message;
      }
    })
  }

  getRequest(){
    this.database.getAssignWork().subscribe({
    next:data=>{
      // console.warn("assign work", data);
      if(data[1].get[0].data== 0){
      }else if(data[1].get[0].status == 1){
        this.totalAssigned = data[1].get[0].totalRow;
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
    this.showTab("dashboard");
    this.getRequester();
    this.loginSerivce.adminData();
    this.getRequest();
    this.getTechnician();
  }

}
