import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserCheckAuthenticationService {
  cookieValue: any;
  constructor(private cookieService: CookieService) { }

  getHeaderWithToken() {
    let headers = new HttpHeaders();
    this.cookieValue = this.cookieService.get('token');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'bearer ' + this.cookieValue);
    return headers;
  }
  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }
}
