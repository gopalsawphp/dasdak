import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UsersService} from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements  CanActivate{
constructor(private userLog:UsersService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
       if (!this.userLog.isLoggedInUser()) {
        this.userLog.deleteToken();
        this.router.navigateByUrl('/signin');
        return false;
      }
    return true;
    }
  
}
