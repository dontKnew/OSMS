import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient){ }

  url:any  = "http://localhost/PHP/Development/API/OSMS/index.php" 

// user features API

  newUser(data:any){
    return this.http.post<any>(this.url+"?newUser=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  verifyEmail(data:any){
    return this.http.post<any>(this.url+"?verifyMail=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  sentMail(data:any){
    return this.http.post<any>(this.url+"?sentMail=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  loginUser(data:any){
    return this.http.post<any>(this.url+"?loginUser=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getUser(email:any){
    return this.http.get<any>(this.url+"?singleUser=1&email="+email).pipe(map((res:any)=>{
      return res;
    }));
  }

  changeName(data:any){
    return this.http.post<any>(this.url+"?changeName=1", data).pipe(map((res:any)=>{
      return res;
    }));
  }

  changePassword(data:any){
    return this.http.post<any>(this.url+"?changePassword=1", data).pipe(map((res:any)=>{
      return res;
    }));
  }

  submitRequest(data:any){
    return this.http.post<any>(this.url+"?submitRequest=1", data).pipe(map((res:any)=>{
      return res;
    }));
  }

  requestStatus(id:number){
    return this.http.get<any>(this.url+"?requestStatus=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteRequest(id:number){
    return this.http.get<any>(this.url+"?deleteRequest=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  getSingleSubmittedRequest(id:number){
    return this.http.get<any>(this.url+"?getSingleSubmittedRequest=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }




  // ADMIN API
  loginAdmin(data:any){
    return this.http.post<any>(this.url+"?loginAdmin=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getAdmin(email:any){
    return this.http.get<any>(this.url+"?singleAdmin=1&email="+email).pipe(map((res:any)=>{
      return res;
    }));
  }

  getSubmittedRequest(){
    return this.http.get<any>(this.url+"?getSubmittedRequest=1").pipe(map((res:any)=>{
      return res;
    }));
  }

  newAssignWork(data:any){
    return this.http.post<any>(this.url+"?newAssignWork=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getAssets(){
    return this.http.get<any>(this.url+"?getAssets=1").pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteAssets(id:number){
    return this.http.get<any>(this.url+"?deleteAssets=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  getSingleAssets(id:number){
    return this.http.get<any>(this.url+"?getSingleAssets=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateAssets(data:any){
    return this.http.post<any>(this.url+"?updateAssets=1", data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addAssets(data:any){
    return this.http.post<any>(this.url+"?addAssets=1", data).pipe(map((res:any)=>{
      return res;
    }));
  }

  sellAssets(data:any){
    return this.http.post<any>(this.url+"?sellAssets=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getRequester(){
    return this.http.get<any>(this.url+"?getRequester=1").pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteRequester(id:number){
    return this.http.get<any>(this.url+"?deleteRequester=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  getSingleRequester(id:number){
    return this.http.get<any>(this.url+"?getSingleRequester=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateRequester(data:any){
    return this.http.post<any>(this.url+"?updateRequester=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addRequester(data:any){
    return this.http.post<any>(this.url+"?addRequester=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getTechnician(){
    return this.http.get<any>(this.url+"?getTechnician=1").pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteTechnician(id:number){
    return this.http.get<any>(this.url+"?deleteTechnician=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateTechnician(data:any){
    return this.http.post<any>(this.url+"?updateTechnician=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getSingleTechnician(id:number){
    return this.http.get<any>(this.url+"?getSingleTechnician=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  addTechnician(data:any){
    return this.http.post<any>(this.url+"?addTechnician=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getAssignWork(){
    return this.http.get<any>(this.url+"?getAssignWork=1").pipe(map((res:any)=>{
      return res;
    }));
  }

  getSingleAssignWork(id:number){
    return this.http.get<any>(this.url+"?getSingleAssignWork=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteAssignWork(id:number){
    return this.http.get<any>(this.url+"?deleteAssignWork=1&id="+id).pipe(map((res:any)=>{
      return res;
    }));
  }

 getWorkReport(start:any, end:any){
    return this.http.get<any>(this.url+"?getWorkReport=1&start="+start+"&end="+end).pipe(map((res:any)=>{
      return res;
    }));
 }

 getSellReport(start:any, end:any){
  return this.http.get<any>(this.url+"?getSellReport=1&start="+start+"&end="+end).pipe(map((res:any)=>{
    return res;
  }));
 }

 adminChange(data:any){
  return this.http.post<any>(this.url+"?adminChange=1",data).pipe(map((res:any)=>{
    return res;
  }));
}

}
