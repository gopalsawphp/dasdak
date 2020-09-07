import { state, style, trigger,transition,animate } from '@angular/animations';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' }))
    ]),
  ],
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first_name', 'last_name','email','zip_code','no_of_guests', 
  'create_on','details']
  searchData:any;
  DataStatus:any;
  panelOpenState = false;
  expandedElement: any;
  guestAllList=[];
  guestDataLoader:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource : MatTableDataSource<any>;
  constructor(private CustomerService: CustomerService, public router:Router) { 
  }



  ngOnInit(): void {
    this.customerAllList();
  }

  customerAllList(){
    this.DataStatus="Loading...";
    this.CustomerService.getCustomerAllList().subscribe((res: any) => { 
      if(res.success && res.data.length > 0){
        console.log(res.data);
        this.dataSource = new MatTableDataSource(res.data); 
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
           }else{
            this.DataStatus="Record is not available";
            this.dataSource = new MatTableDataSource([]);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
           }
    },
    err => {
     console.log(err);
   });

}






guestListByCustomerId(customerId){
  this.guestDataLoader="Loading...";
  this.CustomerService.getGuestListByCustomerId(customerId).subscribe((res: any) => { 
    if(res.success && res.data.length > 0){
      this.guestAllList = res.data;
         }else{
          this.guestDataLoader="Guest is not available";
          this.guestAllList =[];
         }
  },
  err => {
   console.log(err);
 });

}


searchDataClear(){
  this.searchData='';
 this.applyFilter(this.searchData);
}


applyFilter(data){
  if(data=='' || data==undefined){
      this.customerAllList();
  }else{
    this.DataStatus="Loading...";
let dataSearch = data.trim().toLocaleLowerCase();
 this.CustomerService.customerEmailFilterData(dataSearch).subscribe((res: any) => { 
  if(res.success && res.data.length > 0){
    this.dataSource = new MatTableDataSource(res.data); 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
       }else{
        this.DataStatus="Record is not available";
        this.dataSource = new MatTableDataSource([]);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       }
},
err => {
 console.log(err);
});
  } 
}

viewDetails(cusId){

  this.router.navigate(['admin/guest-details',cusId]);
}

}
