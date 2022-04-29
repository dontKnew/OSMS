import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    loggedIn:boolean = false;
    userName:string = '';
    adminEmail:any = '';
    adminId:number | boolean= false;
    
  constructor(private database:DatabaseService, private router:Router){
      this.adminData();
  }

  logout(){
      this.loggedIn = false;
      localStorage.setItem("isAdminLogged", "false");
      localStorage.removeItem('adminEmail');
      this.router.navigate(['/home']);
       // localStorage.clear();
  }
  login(email:any){
      this.loggedIn=true;
      localStorage.setItem("isAdminLogged", "true");
      const newLocal = "adminEmail";
      localStorage.setItem(newLocal, email);     
  }

  isLogin(){
      if(localStorage.getItem("isAdminLogged")==="true"){
          this.loggedIn = true;
          return true;
      }else {
          this.loggedIn = false;
          return false;
      }
  }
  
  adminData(){
    this.database.getAdmin(localStorage.getItem("adminEmail")).subscribe({
      next:response=>{
        // console.warn(response);
        if(response[1].get[0].data!==0){
          this.userName = response[1].get[0].data[0].a_name;
          this.adminEmail = response[1].get[0].data[0].a_email;
          this.adminId = response[1].get[0].data[0].a_login_id;
        }else if(response[1].get[0].status){
          console.warn("no data found of admin");
        }
      }, 
      error:error=>{
        console.warn(error.message);
      }
    })
  }
}
