import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sellreport',
  templateUrl: './sellreport.component.html',
  styleUrls: ['./sellreport.component.css']
})
export class SellreportComponent implements OnInit {

  sellReportData:any | boolean;
  message:string = ''

  submitBtn:string = "Submit";

  constructor(private database:DatabaseService) { }

  sellReportForm = new FormGroup({
    "startdate" : new FormControl("", [Validators.required]),
    "enddate" : new FormControl("", [Validators.required]),
  })
  
  sellReport(){
    this.database.getSellReport(this.sellReportForm.value.startdate, this.sellReportForm.value.enddate).subscribe({
    next:data=>{
      console.warn(data);
      if(data[1].get[0].data== 0){
        this.sellReportData = false;
        this.message = "No Record Found";
      }else if(data[1].get[0].status == 1){
        this.sellReportData = data[1].get[0].data;
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
  },3000);
 }

  ngOnInit(): void {

  }
}
