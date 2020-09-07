import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-registration-verify',
  templateUrl: './registration-verify.component.html',
  styleUrls: ['./registration-verify.component.css']
})
export class RegistrationVerifyComponent implements OnInit {
  params: any;
  Tinvalid=false;
  msuccess=false;
 constructor(private route: ActivatedRoute, private userService: UsersService){
  this.params = this.route.snapshot.queryParams["token"];
  console.log("this.params");
  console.log(this.params);
  //this.params = route.snapshot.params;
  console.log("this.params");
  }
  ngOnInit(): void {
    if (!this.params) {
      this.Tinvalid=true; 
    } else {
      this.userService.verifyUser({'e_token':this.params}).subscribe((result:any)=>{
     if(result.success == true){
         this.msuccess = true;
    this.Tinvalid = false;
      }else{
      this.Tinvalid = true;
       this.msuccess = false;
      }
     })
    }

  }

}
