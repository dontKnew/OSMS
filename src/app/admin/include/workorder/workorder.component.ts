import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkorderComponent implements OnInit {

  message:string = '';
  RequestData:any | boolean;
  assignDetails:boolean = false;
  singleRequest: any | boolean;
  
  constructor(private database:DatabaseService) { }

  getRequest(){
    this.database.getAssignWork().subscribe({
    next:data=>{
      // console.warn(data);
      if(data[1].get[0].data== 0){
        this.RequestData = false;
        // console.warn("data is zero");
      }else if(data[1].get[0].status == 1){
        this.RequestData = data[1].get[0].data;
        // console.warn("data got it");
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
  openAssign(id:number){
    console.warn(id);
    this.database.getSingleAssignWork(id).subscribe({
      next:data=>{
        console.warn("single Request", data);
        if(data[1].get[0].data == 0){
          this.message = "No data found";
        }else if(data[1].get[0].status == 1){
          this.assignDetails = true;
          this.singleRequest = data[1].get[0].data[0];
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
    this.database.deleteAssignWork(id).subscribe({
      next:data=>{
        console.warn(data[1].delete);
        if(data[1].delete[0].status == 1){
          this.message = "Work has been deleted";
          this.getRequest();
        }else if(data[1].delete[0].status == 0){
          this.message = "Work could not delete";
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
  
  ngOnInit(): void {
    this.getRequest();
  }

}
