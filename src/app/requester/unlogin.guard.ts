import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class UnloginGuard implements CanActivate {
  constructor(private login:LoginServiceService, private router:Router,){}
  canActivate(route: ActivatedRouteSnapshot, tstate: RouterStateSnapshot):boolean | Promise<boolean>{
    if(this.login.isLogin()){
        this.router.navigate(['/user']);
    }
    return true;
  }
}
