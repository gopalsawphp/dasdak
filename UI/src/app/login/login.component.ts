import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public signin: FormGroup;
  constructor(private cookieService: CookieService, private fb: FormBuilder, private router: Router,
    private userService: UsersService,  private _snackBar: MatSnackBar,) {
  }

  loginText = 'SignIn';
  action=null;
  publicData:any;
  ngOnInit() {
    this.signin = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });

  
  }
   
    serverErrorMessages: string;
  onSubmit() {
   this.loginText = 'Sending...';
    this.userService.login(this.signin.value).subscribe((resmsg: any) => {
      if (resmsg.success == true) {
        var expire = new Date();
        var time = Date.now() + ((3600 * 1000) * 6); // current time + 6 hours ///
        expire.setTime(time);
        this.cookieService.set('token', resmsg.data.token, expire);
        this.publicData = {
          userName:resmsg.data.userName,
          fullName:resmsg.data.fullName,
          last_login:resmsg.data.last_login,
          role_type:resmsg.data.role_type,
        }
        localStorage.setItem('publicToken', JSON.stringify(this.publicData));      
        if(resmsg.data.role_type===1){
          this._snackBar.open('Welcome '+ resmsg.data.fullName, this.action, {
            duration: 5000,
            verticalPosition: 'top', // 'top' | 'bottom'
            panelClass: ['green-snackbar'],
          });
          this.router.navigateByUrl('admin/dashboard');
          }
      } else {
        this._snackBar.open(resmsg.message, this.action, {
          duration: 5000,
          verticalPosition: 'top', // 'top' | 'bottom'
          panelClass: ['red-snackbar'],
        });
        console.log("failed" , this.serverErrorMessages);
   this.loginText = 'Signin';
      }
    },
      err => {
        this.loginText = 'Signin';
        this.serverErrorMessages = err.error.message;
      });
  }

}
