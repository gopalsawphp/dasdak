import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { isNumeric } from 'rxjs/util/isNumeric';
import { CustomerService} from '../services/customer.service';
@Component({
  selector: 'app-list-guest',
  templateUrl: './list-guest.component.html',
  styleUrls: ['./list-guest.component.css']
})
export class ListGuestComponent implements OnInit {
  DataStatus:any;
  constructor(private route: ActivatedRoute,private router:Router,private CustomerService: CustomerService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(isNumeric(id))
    { 
     this.getCustomerWithGuestList(id);
    }
    else{
     // this.notifier.notify( 'error', 'Your url is not valid');   
      this.router.navigate(['admin/dashboard']);
    }
  }


  getCustomerWithGuestList(id){
    this.DataStatus="Loading...";
    this.CustomerService.getCustomerWithGuestList(id).subscribe((res: any) => { 
      if(res.success){
        console.log(res.data);
       
           }else{
            
           }
    },
    err => {
     console.log(err);
   });
  }

  

}
