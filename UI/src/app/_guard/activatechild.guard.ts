import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UsersService} from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class ActivatechildGuard implements CanActivateChild  {
  constructor(private userLog:UsersService, private router:Router){}

  canActivateChild(
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
