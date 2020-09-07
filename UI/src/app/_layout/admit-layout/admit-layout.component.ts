import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
@Component({
  selector: 'app-admit-layout',
  templateUrl: './admit-layout.component.html',
  styleUrls: ['./admit-layout.component.css']
})
export class AdmitLayoutComponent implements OnInit {
  userobj:any;
  fullName:any;
  constructor(private userService: UsersService,private router:Router,
    private cookieService: CookieService) {
    this.userobj = JSON.parse(localStorage.getItem('publicToken'))
    this.fullName = this.userobj.fullName
   }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('publicToken')
    localStorage.clear()
    this.cookieService.delete('token')
    this.cookieService.deleteAll()
    this.router.navigateByUrl('')
    }

  }

