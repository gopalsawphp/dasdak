import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
  import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CustomValidators } from 'ng2-validation';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  buttonText="Signup";
  eEmail:boolean=false;
  eContact:boolean=false;
  sStatus:boolean=false;
  fStatus:boolean=true;
  genderObj:any;
  action:any;
  public signUpForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private userService: UsersService,
    private cookieService: CookieService, private router: Router,private _snackBar: MatSnackBar) {
      this.genderObj = [
        {
          value:'Male',name:'Male',
        },
        {
         value:'Female',name:'Female',
       },
       {
         value:'Trans Gender',name:'Trans Gender',
       }
]
     

      let pass = new FormControl('', Validators.required);
      let cpass = new FormControl('', CustomValidators.equalTo(pass));
      this.signUpForm = new FormGroup({
        fname: new FormControl('', Validators.required),
        lname: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),   
        emailid: new FormControl('', [Validators.required,CustomValidators.email]),
        cont: new FormControl('', [Validators.required, Validators.maxLength(12),CustomValidators.number]),
        pass: pass,
        cpass: cpass,
    });
  }
  ngOnInit(): void {

   }


   onSubmit(){
    this.buttonText ='Loading....';
    if (!this.signUpForm.invalid) {
    this.userService.userSignUp(this.signUpForm.value).subscribe((res: any) => {
      this.buttonText ='Signup';
       if(res.success){
        this.sStatus=true;
        this.fStatus=false;
        this._snackBar.open('You have registered successfully', this.action, {
          duration: 5000,
          verticalPosition: 'top', // 'top' | 'bottom'
          panelClass: ['green-snackbar'],
        });
       }else {
        this._snackBar.open(res.message, this.action, {
          duration: 5000,
          verticalPosition: 'top', // 'top' | 'bottom'
          panelClass: ['red-snackbar'],
        });
      }
    },
     err => {
          this.buttonText ='Signup';
    });
    }
  
  }


  checkEmail(emailValue){
    if (emailValue !== undefined) {
      if (emailValue.length > 0) {
    this.userService.emailCheckExists(emailValue).subscribe((result: any) => {
      console.log(result);
      if (result.success == true) {
        this.eEmail = true;
      } else {
      this.eEmail = false;
    }
    });
  }
}
  }



  checkContact(emailValue){
    if (emailValue !== undefined) {
      if (emailValue.length > 0) {
    this.userService.ContactCheckExists(emailValue).subscribe((result: any) => {
      console.log(result);
      if (result.success == true) {
        this.eContact = true;
      } else {
      this.eContact = false;
    }
    });
  }
}
  }




}
