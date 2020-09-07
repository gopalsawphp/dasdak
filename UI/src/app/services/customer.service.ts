import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service'
import {UserCheckAuthenticationService } from './user-check-authentication.service'
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import { filter, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 // getHeaderWithToken
 basePath: string;
 constructor(private http:HttpClient,private userGetHeader:UserCheckAuthenticationService,
   private cookieService: CookieService) {
   this.basePath = environment.apiBaseUrl;
  }
  getCustomerAllList() {
    return this.http
      .request('get', Location.joinWithSlash(`${this.basePath}`, `customer-list`), {
        observe: 'response',
        headers: this.userGetHeader.getHeaderWithToken(),
      })
      .pipe(
        map((response) => {
          switch (response.status) {
            case 200: {
              return response.body
            }
          }
        })
      )
  }

  getGuestListByCustomerId(customerId) {
    return this.http
      .request('get', Location.joinWithSlash(`${this.basePath}`, `guest-list/${encodeURIComponent(customerId)}`), {
        observe: 'response',
        headers: this.userGetHeader.getHeaderWithToken(),
      })
      .pipe(
        map((response) => {
          switch (response.status) {
            case 200: {
              return response.body
            }
          }
        })
      )
  }



  getCustomerWithGuestList(id:any) {
    return this.http
      .request('get', Location.joinWithSlash(`${this.basePath}`, `customer-list/${encodeURIComponent(id)}`), {
        observe: 'response',
        headers: this.userGetHeader.getHeaderWithToken(),
      })
      .pipe(
        map((response) => {
          switch (response.status) {
            case 200: {
              return response.body
            }
          }
        })
      )
  }

  customerEmailFilterData(email:any) {
    return this.http
      .request('get', Location.joinWithSlash(`${this.basePath}`, `customer-email-list/${encodeURIComponent(email)}`), {
        observe: 'response',
        headers: this.userGetHeader.getHeaderWithToken(),
      })
      .pipe(
        map((response) => {
          switch (response.status) {
            case 200: {
              return response.body
            }
          }
        })
      )
  }



  

}
