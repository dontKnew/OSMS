import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private loginService:LoginService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, tstate: RouterStateSnapshot):boolean | Promise<boolean>{
      if(!this.loginService.isLogin()){
        this.router.navigate(['/author']);
    }
    return this.loginService.isLogin();  
  }
  
}
