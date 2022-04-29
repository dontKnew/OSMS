import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {

  technicianData:any;
  technicianSingleData:any;
  message:string = ''

  showTable:boolean = false;
  editTable:boolean = false;
  addTable:boolean = false;
  doubleTable:boolean = false;

  updateBtn:string = "Update";
  submitBtn:string = "Submit";

  constructor(private database:DatabaseService) { }

  backToTable(tab:string){
    if("showTable"==tab){
      this.showTable = true;
      this.editTable = false;
      this.addTable = false;
      this.doubleTable = false;
    }else if("editTable"==tab){
      this.showTable = false;
      this.addTable = false;
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

  deleteTechnician(id:number){
    this.database.deleteTechnician(id).subscribe({
      next:data=>{
        console.warn(data);
        if(data[1].delete[0].status == 1){
          this.message = "One technician has been deleted";
          this.getTechnician();
          this.message = "technician could not delete";
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
  technicianForm = new  FormGroup({
    "empid":new FormControl("0", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "empName":new FormControl("", [Validators.required]),
    "empCity":new FormControl("", [Validators.required]),
    "empMobile":new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "empEmail":new FormControl("", [Validators.required, Validators.email])
  })


  get empid(){
    return this.technicianForm.get("empid");
  }
  get empName(){
    return this.technicianForm.get("empName");
  }
  get empCity(){
    return this.technicianForm.get("empCity");
  }
  get empMobile(){
    return this.technicianForm.get("empMobile");
  }
  get empEmail(){
    return this.technicianForm.get("empEmail");
  }

  formData = new FormData();
  addTechnician(){
    this.updateBtn = "Please Wait";
    this.formData.append("empName", this.technicianForm.value.empName);
    this.formData.append("empCity", this.technicianForm.value.empCity);
    this.formData.append("empMobile", this.technicianForm.value.empMobile);
    this.formData.append("empEmail", this.technicianForm.value.empEmail);
    this.database.addTechnician(this.formData).subscribe({
      next:data=>{
        console.warn(data);
        this.submitBtn = "Submit";
        if(data[1].post[0].status==1){
          // window.scroll({ top: 0, left: 0, behavior: 'smooth'});
          this.message = "technician added";
        }else if(data[1].post[0].status==0){
          this.message = "technician Data could not add";
        }else {
          this.message = "Server response error";
        }
      }, 
      error:error=>{
        this.message = error.message;
        this.submitBtn= "Submit";
      }
    })
    setTimeout(()=>{
      this.message = '';
    }, 5000);
  }
  


  viewTechnician(id:number){
    this.backToTable("editTable");
    this.database.getSingleTechnician(id).subscribe({
      next:data=>{
        // console.warn(data);
        if(data[1].get[0].data== 0){
          console.warn("technician single request could not get");
        }else if(data[1].get[0].status == 1){
        this.technicianForm.patchValue({
          "empid":data[1].get[0].data[0].empid,
          "empName":data[1].get[0].data[0].empName,
          "empCity":data[1].get[0].data[0].empCity,
          "empMobile":data[1].get[0].data[0].empMobile,
          "empEmail":data[1].get[0].data[0].empEmail,
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
  
  
  updateTechnician(){
    this.updateBtn = "Please Wait";
    this.formData.append("id", this.technicianForm.value.empid);
    this.formData.append("empName", this.technicianForm.value.empName);
    this.formData.append("empCity", this.technicianForm.value.empCity);
    this.formData.append("empMobile", this.technicianForm.value.empMobile);
    this.formData.append("empEmail", this.technicianForm.value.empEmail);

    this.database.updateTechnician(this.formData).subscribe({
      next:data=>{
        console.warn(data);
        this.updateBtn = "Update";
        if(data[1].update[0].status==1){
          // window.scroll({ top: 0, left: 0, behavior: 'smooth'});
          this.message = "technician Data Updated";
        }else if(data[1].update[0].status==0){
          this.message = "technician Data could not updated";
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

  ngOnInit(): void {
    this.getTechnician();
    this.backToTable("showTable");
  }

}
