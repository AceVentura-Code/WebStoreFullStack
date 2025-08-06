import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from './IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {
  private _user: string[]= [];
  
  UrlOrder : string = 'https://localhost:7282/api/Orders' 
  constructor(private http: HttpClient) { }


  registerOrder(order: IOrder): Observable<any>{
    console.log(JSON.stringify(order));
    return this.http.post<IOrder>(this.UrlOrder, order);
  }

}
