import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  
  assetsData:any;
  message:string = ''

  updateBtn:string = "Update";
  sellBtn:string = "Submit";
  addBtn:string = "Submit";

  showTable:boolean = false;
  editTable:boolean = false;
  sellTable:boolean = false;
  addTable:boolean = false;
  doubleAssetsTable = false;

  updateAssetsId:number = 0
  sellAssetsId:number = 0;

  constructor(private database:DatabaseService) { }

  backToTable(tab:string){
      if("showTable"==tab){
        this.showTable = true;
        this.editTable = false;
        this.sellTable = false;
        this.addTable = false;
        this.doubleAssetsTable = false;
      }else if("editTable"==tab){
        this.showTable = false;
        this.editTable = true;
        this.sellTable = false;
        this.addTable = false;
        this.doubleAssetsTable = true;
      }else if("sellTable"==tab){
        this.showTable = false;
        this.editTable = false;
        this.addTable = false;
        this.sellTable = true;
        this.doubleAssetsTable = false;
      }else if("addTable"==tab){
        this.showTable = false;
        this.editTable = false;
        this.sellTable = false;
        this.addTable = true;
        this.doubleAssetsTable = true;
      }
  }

  getAssets(){
    this.database.getAssets().subscribe({
    next:data=>{
      console.warn(data);
      if(data[1].get[0].data== 0){
        this.assetsData = false;
      }else if(data[1].get[0].status == 1){
        this.assetsData = data[1].get[0].data;
      }else {
        this.message = "Server response error";
      }
    }, 
    error:error=>{
      this.message = error.message;
    }
  })
}

  deleteAssets(id:number){
    this.database.deleteAssets(id).subscribe({
      next:data=>{
        console.warn(data);
        if(data[1].delete[0].status == 1){
          this.message = "Assets has been deleted";
          this.getAssets();
          this.message = "Assets could not delete";
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

  issueAssets(id:any){
    this.sellAssetsId = id;
    this.backToTable("sellTable");
    this.database.getSingleSubmittedRequest(id).subscribe({
      next:data=>{
        console.warn(data);
        if(data[1].get[0].data== 0){
        }else if(data[1].get[0].status == 1){
         data[1].get[0].data[0];
        this.assetsSellForm.patchValue({
          "pid":data[0].get[0].data[0].pid,
          "pname":data[1].get[0].data[0].pname,
          "pdop":data[1].get[0].data[0].pdop,
          "pava":data[1].get[0].data[0].pava,
          "ptotal":data[1].get[0].data[0].ptotal,
          "poriginalcost":data[1].get[0].data[0].poriginalcost,
          "psellingcost":data[1].get[0].data[0].psellingcost,
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
  

  assetsForm = new FormGroup({
    "pid": new FormControl("1", [Validators.required]),
    "pname": new FormControl("", [Validators.required]),
    "pdop": new FormControl("", [Validators.required]),
    "pava": new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "ptotal": new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "poriginalcost": new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "psellingcost": new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  })


  get pid (){
    return this.assetsForm.get("pid");
  }
  get pname (){
    return this.assetsForm.get("pname");
  }
  get pdop (){
    return this.assetsForm.get("pdop");
  }
  get pava (){
    return this.assetsForm.get("pava");
  }
  get ptotal (){
    return this.assetsForm.get("ptotal");
  }
  get poriginalcost (){
    return this.assetsForm.get("poriginalcost");
  }
  get psellingcost (){
    return this.assetsForm.get("psellingcost");
  }
    
  viewAssets(id:number){
    this.backToTable("editTable");
    this.database.getSingleAssets(id).subscribe({
      next:data=>{
        console.warn(data[1].get[0].data[0]);
        if(data[1].get[0].data == 0){
          console.warn("data could not get current product for sell");
        }else if(data[1].get[0].status == 1){
        // this.singleRequestData = data[1].get[0].data[0];
        this.assetsForm.patchValue({
          "pid":data[1].get[0].data[0].pid,
          "pname":data[1].get[0].data[0].pname,
          "pdop":data[1].get[0].data[0].pdop,
          "pava":data[1].get[0].data[0].pava,
          "ptotal":data[1].get[0].data[0].ptotal,
          "totalcost":data[1].get[0].data[0].poriginalcost,
          "psellingcost":data[1].get[0].data[0].psellingcost,
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

  
  
  formData = new FormData();
  updateAssets(){
    this.updateBtn = "Please Wait";
    this.formData.append("pid", this.assetsForm.value.pid);
    this.formData.append("pname", this.assetsForm.value.pname);
    this.formData.append("pdop", this.assetsForm.value.pdop);
    this.formData.append("pava", this.assetsForm.value.pava);
    this.formData.append("ptotal", this.assetsForm.value.ptotal);
    this.formData.append("poriginalcost", this.assetsForm.value.poriginalcost);
    this.formData.append("psellingcost", this.assetsForm.value.psellingcost);
    this.formData.append("id", this.updateAssetsId.toString());
    this.database.updateAssets(this.formData).subscribe({
      next:data=>{
        console.warn(data);
        this.updateBtn = "Update";
        if(data[1].post[0].status==1){
          window.scroll({ top: 0, left: 0, behavior: 'smooth'});
          this.message = "Assets Updated";
        }else if(data[1].post[0].status==0){
          this.message = "Assets could not updated";
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

  addAssets(){
    this.addBtn = "Please Wait";
    this.formData.append("pname", this.assetsForm.value.pname);
    this.formData.append("pdop", this.assetsForm.value.pdop);
    this.formData.append("pava", this.assetsForm.value.pava);
    this.formData.append("ptotal", this.assetsForm.value.ptotal);
    this.formData.append("poriginalcost", this.assetsForm.value.poriginalcost);
    this.formData.append("psellingcost", this.assetsForm.value.psellingcost);
    this.database.addAssets(this.formData).subscribe({
      next:data=>{
        console.warn(data);
        this.addBtn = "Submit";
        if(data[1].post[0].status==1){
          this.message = "Assets Added";
        }else if(data[1].post[0].status==0){
          this.message = "Assets could not add";
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

  assetsSellForm = new FormGroup({
    "pid1":new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "cname1":new FormControl("", [Validators.required]),
    "cadd1":new FormControl("", [Validators.required]),
    "pname1":new FormControl("", [Validators.required]),
    "pava1":new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "pquantity1":new FormControl("", [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "psellingcost1":new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "totalcost1":new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    "selldate1":new FormControl("", [Validators.required])
  })
  
  get pid1(){
    return this.assetsSellForm.get("pid1");
  }
  get cname1(){
      return this.assetsSellForm.get("cname1");
  }
  get cadd1(){
      return this.assetsSellForm.get("cadd1");
  }
  get pname1(){
      return this.assetsSellForm.get("pname1");
  }
  get pava1(){
      return this.assetsSellForm.get("pava1");
  }
  get pquantity1(){
      return this.assetsSellForm.get("pquantity1");
  }
  get psellingcost1(){
      return this.assetsSellForm.get("psellingcost1");
  }
  get totalcost1(){
      return this.assetsSellForm.get("totalcost1");
  }
  get selldate1(){
      return this.assetsSellForm.get("selldate1");
  }

  // update pava and quan
  sellAssets(){
    let pava = this.assetsSellForm.value.pquantity1 - this.assetsSellForm.value.pquantity1 ;
    this.sellBtn = "Please Wait";
    this.formData.append("pid", this.assetsSellForm.value.pid1 );
    this.formData.append("cname", this.assetsSellForm.value.cname1 );
    this.formData.append("cadd", this.assetsSellForm.value.cadd1 );
    this.formData.append("pname", this.assetsSellForm.value.pname1 );
    this.formData.append("pquantity", this.assetsSellForm.value.pquantity1 );
    this.formData.append("psellingcost", this.assetsSellForm.value.psellingcost1 );
    this.formData.append("totalcost", this.assetsSellForm.value.totalcost1 ),
    this.formData.append("selldate", this.assetsSellForm.value.selldate1);
    this.formData.append("pava", pava.toString());
    this.database.sellAssets(this.formData).subscribe({
      next:data=>{
        console.warn(data);
        this.sellBtn = "Submit";
        if(data[2].post[0].status==1 && data[1].post[0].status==1 ){
          window.scroll({ top: 0, left: 0, behavior: 'smooth'});
          this.message = "Successfully Sold";
        }else if(data[2].post[0].status==0 && data[1].post[0].status==1){
          this.message = "Assets could not sale";
        }else {
          this.message = "Server response error";
        }
      }, 
      error:error=>{
        this.message = error.message;
        this.sellBtn = "Submit";
      }
    })
    setTimeout(()=>{
      this.message = '';
    }, 5000);
  }

  ngOnInit(): void {
    this.getAssets();
    this.backToTable("showTable");
  }

}
