import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private loginService:LoginServiceService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, tstate: RouterStateSnapshot):boolean | Promise<boolean>{
      if(!this.loginService.isLogin()){
        this.router.navigate(['/login']);
    }
    return this.loginService.isLogin();  
  }
  
}
