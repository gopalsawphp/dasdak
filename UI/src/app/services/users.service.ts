
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
export class UsersService {
  basePath: string;
  constructor(private http:HttpClient,private userGetHeader:UserCheckAuthenticationService,
    private cookieService: CookieService) {
    this.basePath = environment.apiBaseUrl;
   }


   isLoggedInUser() {
    return this.cookieService.get('token')
  }

  deleteToken() {
    return this.cookieService.delete('token')
  }

  Logout() {
    return this.http.get(environment.apiBaseUrl + 'userLogout')
  }



   emailCheckExists(data: any) {
    return this.http
      .request('post', Location.joinWithSlash(`${this.basePath}`, `email-check`), {
        observe: 'response',
        headers: this.userGetHeader.getHeader(),
        body: JSON.stringify({ email: data }),
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

  ContactCheckExists(data: any) {
    return this.http
      .request('post', Location.joinWithSlash(`${this.basePath}`, `contact-check`), {
        observe: 'response',
        headers: this.userGetHeader.getHeader(),
        body: JSON.stringify({ mobile: data }),
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


  userSignUp(data: any) {
    console.log(data)
    return this.http
      .request('post', Location.joinWithSlash(`${this.basePath}`, `signup`), {
        observe: 'response',
        headers: this.userGetHeader.getHeader(),
        body: JSON.stringify(data),
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

  customerEmailCheckExists(data: any) {
    return this.http
      .request('post', Location.joinWithSlash(`${this.basePath}`, `customer-email-check`), {
        observe: 'response',
        headers: this.userGetHeader.getHeader(),
        body: JSON.stringify({ email: data }),
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


  CustomerSignUp(data: any) {
    console.log(data)
    return this.http
      .request('post', Location.joinWithSlash(`${this.basePath}`, `customer-signup`), {
        observe: 'response',
        headers: this.userGetHeader.getHeader(),
        body: JSON.stringify(data),
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

  


  verifyUser(data: any) {
    return this.http.request('post', Location.joinWithSlash(`${this.basePath}`, `user-verify`), {
      observe: 'response',
      headers :this.userGetHeader.getHeader(),
      body: JSON.stringify(data)
    })
      .map(response => {
        switch (response.status) {
          case 200: {
            return response.body;
          }
        }
      })
  }

   login(data: any) {
    return this.http.request('post', Location.joinWithSlash(`${this.basePath}`, `signin`), {
      observe: 'response',
      headers : this.userGetHeader.getHeader(),
      body: JSON.stringify(data)
    })
    .pipe(map(response => {
        switch (response.status) {
          case 200: {
            return response.body;
          }
        }
      }))
  }
}
