import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
    loggedIn:boolean = false;
    userName:string = '';
    userEmail:any = '';
    userId:number | boolean= false;
    
  constructor(private database:DatabaseService){
      this.userData();
  }

  logout(){
      this.loggedIn = false;
      localStorage.setItem("isUserLogged", "false");
      localStorage.removeItem('userEmail');
       // localStorage.clear();
  }
  login(email:any){
      this.loggedIn=true;
      localStorage.setItem("isUserLogged", "true");
      const newLocal = "userEmail";
      localStorage.setItem(newLocal, email);     
  }

  isLogin(){
      if(localStorage.getItem("isUserLogged")==="true"){
          this.loggedIn = true;
          return true;
      }else {
          this.loggedIn = false;
          return false;
      }
  }

  userData(){
    this.database.getUser(localStorage.getItem("userEmail")).subscribe({
      next:response=>{
        // console.warn(response[1].get[0].data[0].r_password);
        this.userName = response[1].get[0].data[0].r_name;
        this.userEmail = response[1].get[0].data[0].r_email;
        this.userId = response[1].get[0].data[0].r_login_id;
      }, 
      error:error=>{
        console.warn(error.message);
      }
    })
  }
}
