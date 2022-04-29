import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-workreport',
  templateUrl: './workreport.component.html',
  styleUrls: ['./workreport.component.css']
})
export class WorkreportComponent implements OnInit {

  message:string = '';
  workReportData:any | boolean;
  submitBtn:string = "Submit";
  
  constructor(private database:DatabaseService) { }

  workReportForm = new FormGroup({
    "startdate" : new FormControl("", [Validators.required]),
    "enddate" : new FormControl("", [Validators.required]),
  })
  
  workReport(){
    this.database.getWorkReport(this.workReportForm.value.startdate, this.workReportForm.value.enddate).subscribe({
    next:data=>{
      console.warn(data);
      if(data[1].get[0].data== 0){
        this.workReportData = false;
        this.message = "No Record Found";
      }else if(data[1].get[0].status == 1){
        this.workReportData = data[1].get[0].data;
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
  }

}
