import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ViewportScroller} from '@angular/common'

import { IUser } from './user-login/IUser';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogIn = false;
  UserInfo: IUser | undefined;
  title = 'FullStackFrontEnd';
  
  constructor (private router: Router, private scroller: ViewportScroller) {}


  ngOnInit(): void {
    const userUnparsed = sessionStorage.getItem('UserLogIn')
    if (userUnparsed !== undefined && userUnparsed !== null) {
      this.UserInfo = JSON.parse(userUnparsed);
      this.isLogIn = true;
    }
    else{
      this.UserInfo = {
        id: 0,
        name: 'Guest',
        passWord : '',
        email: '',
        accessLevel: 'userAccess',
      };
    }
  }

  LogOut(): void {
    sessionStorage.clear()
    this.isLogIn = false;
    this.UserInfo = {
      id: 0,
      name: 'Guest',
      passWord : '',
      email: '',
      accessLevel : 'userAccess'
    }
    this.router.navigateByUrl("/products")
  }
  
  OnScrollUpBtn(): void {
    this.scroller.scrollToPosition([0,0]);
    console.log("OnScrollUpBtn")
  }

}
