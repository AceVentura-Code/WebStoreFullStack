import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { IAttemptLogIn, IUser } from './IUser';
import { LoginService } from './login.service';

@Component({
  //selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  userDefault: IAttemptLogIn = {
    name : '',
    passWord: ''
  };

  UserData: IUser | undefined;
  
  userForm : IAttemptLogIn= {...this.userDefault}
  constructor(private router: Router, private login: LoginService) { }

  ngOnInit(): void {
  }

  OnSubmit(form: NgForm): void {
    if(form.valid){//this.UserData =
       this.login.getUser(this.userForm.name as string).subscribe({
        next: data => { 
        console.log("All: ", JSON.stringify(data));
        this.UserData = data;
        console.log(this.UserData);
        if(this.userForm.passWord == this.UserData.passWord){//would de encripted in actual app
          console.log('password checking passed')
          sessionStorage.setItem('UserLogIn', JSON.stringify(this.UserData) )
          this.router.navigateByUrl("/basket")
         }
        },
        error: err =>console.log(err)
        })
       
    }
    
  }
}
