import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IAttemptLogIn, IUser } from '../IUser';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userDefault: IUser = {
    id: 0,
    name : '',
    passWord: '',
    email :  '' ,
    address :  '',
    //orders { get; set; }
    age : undefined,
    accessLevel :  'userAccess',
  };
  passWordConfirmation: string = this.userDefault.passWord;

  UserData: IUser | undefined;
  
  userForm : IUser= {...this.userDefault}
  constructor(private router: Router, private login: LoginService) { }

  ngOnInit(): void {
  }

  OnRegister(form: NgForm): void {
    if(form.valid){
      this.UserData = form.value;
      if (this.UserData !== undefined){
        if (this.UserData.age !== undefined && this.UserData.age < 1){
          this.UserData.age = undefined;
        }
        this.UserData.accessLevel = 'userAccess';
        this.login.registerUser(this.UserData).subscribe({
          next: data=> (console.log("Success"),
                        console.log( data)),
          error: err=> (console.log("Failed"),
                        console.log(err))
        })
      }
    }
    
  }
}


