import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _user: string[]= [];
  
  UrlUser : string = 'https://localhost:7282/api/Users' 
  constructor(private http: HttpClient) { }
  
  // get user(): string[] {
  //   return this._user;
  // }

  addUser(user: string): void {
    console.log(user);
  }
  getUser(username: string): Observable<IUser>{
    const UrlUserName = this.UrlUser + `/name/${username}`
    return this.http.get<IUser>(UrlUserName)
  }

  registerUser(User: IUser): Observable<any>{
    console.log(User)
    return this.http.post<IUser>(this.UrlUser, User)
  }

}
