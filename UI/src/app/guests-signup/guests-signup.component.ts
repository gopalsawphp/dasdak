import { Component, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
  import { CustomValidators } from 'ng2-validation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-guests-signup',
  templateUrl: './guests-signup.component.html',
  styleUrls: ['./guests-signup.component.css']
})
export class GuestsSignupComponent implements OnInit {
  signUpForm: FormGroup;
  welcomePage: Boolean = false;
  thankYouPage: Boolean = false;
  buttonSubmit="Submit";
  eEmail:boolean=false;
  parentId=null;
  siteSubHeading = 'Bon Secours Training Center, 2401 W Lelgh St, Richmond, VA 23220';
  siteMainHeading = '2018 Redskins Training Camp';
  guests = [1,2,3,4,5,6,7,8,9,10];
  action=null;
  checkboxValue = [{ key: 1, selected:false, value: 'Yes, I would like to sign up for the FREE Season Ticket Waitlist' },
  { key: 2,  selected:false, value: "Yes, I would like to sign up for the FREE Redskins Women'/s club." },
  { key: 3,  selected:false, value: 'Yes, I would like to recieve special offers from the Redskins and her Partner.' },
  { key: 4,  selected:false, value: 'Yes, I would like to sign up for the FREE Redskins Salute Military Appreciation Club.' }];
  siteInvitationMessage = 'Invite your friends and family to the Redskins Training Camp. You are not required to register kids 13 and under - Fan Mobile Pass will also be valid for their entry.';
  importantMessage = 'Entry is first come, first serve. Date of camp are subject to change. See complete schedule and more information at';
  siteToRedirect = 'redskins.com/trainingcamp.'
  importantNotice = '* Please share email address with NBC Universal, so NBC Universal can send me information about special offer and promotion. I have read and agree to'
  siteToRedirectForNotice = "NBC UNERVERSAL'S Privacy Policy."
  displayDataObjectGuest=[];

    constructor (private fb: FormBuilder,private userService: UsersService,private _snackBar: MatSnackBar) {

    this.signUpForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      main_email: new FormControl('', [Validators.required,CustomValidators.email]),
      zipcode: new FormControl('', [Validators.required, Validators.maxLength(6),CustomValidators.number]),
      guests: new FormControl(''),
      options: this.fb.array([]),
      addedFriend: this.fb.array([]),

    });
    this.addCheckboxes();
  }

  addedFriend(): FormArray {
    return this.signUpForm.get("addedFriend") as FormArray
  }
  get optionsFormArray() {
    return this.signUpForm.controls.options as FormArray;
  }

  private addCheckboxes() {
    this.checkboxValue.forEach(() => this.optionsFormArray.push(new FormControl(false)));
  }

  newFriend(): FormGroup {
    return this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,CustomValidators.email]),
    });
  }

  addFriend() {
    this.addedFriend().push(this.newFriend());
  }

  removeFriend(i: number) {
    this.addedFriend().removeAt(i);
  }



  onSignUp(){
    this.buttonSubmit ='Loading....';
    if (!this.signUpForm.invalid) {
      this.signUpForm.value.parentId = this.parentId; 
     for(let i=0; i< this.signUpForm.value.addedFriend.length; i++){
      this.displayDataObjectGuest.push(this.signUpForm.value.addedFriend[i]);
        }
    this.userService.CustomerSignUp(this.signUpForm.value).subscribe((res: any) => {
       if(res.success){
        this.welcomePage = false;
        this.thankYouPage = true;
        this.buttonSubmit ='Submit';
        this.parentId = res.data;
       }else{
        this.buttonSubmit ='Submit';
        this._snackBar.open(res.message, this.action, {
          duration: 5000,
          verticalPosition: 'top', // 'top' | 'bottom'
          panelClass: ['red-snackbar'],
        });
       }
    },
     err => {
          this.buttonSubmit ='Submit';
          this._snackBar.open(err.message, this.action, {
            duration: 5000,
            verticalPosition: 'top', // 'top' | 'bottom'
            panelClass: ['red-snackbar'],
          });
    });
    }
  
  }

  ngOnInit() {
    this.welcomePage = true;
    this.thankYouPage = false
  }

  checkEmail(emailValue){
    if (emailValue !== undefined) {
      if (emailValue.length > 0) {
    this.userService.customerEmailCheckExists(emailValue).subscribe((result: any) => {
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


}
