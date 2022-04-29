import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
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

  ngOnInit(): void {
    this.showTab("dashboard");
    this.getRequester();
    this.loginSerivce.adminData();
  }

}
