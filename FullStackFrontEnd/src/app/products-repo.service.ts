import {HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from "rxjs";
import { IProduct } from "./Product";

@Injectable({
  providedIn: 'root'
})
export class ProductsRepoService {

  ProdApiUrl : string = 'https://localhost:7282/api/Products';
  listaProd: IProduct[] = [];
  constructor(private http: HttpClient) { }

  GetProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.ProdApiUrl).pipe(
      tap(data => { 
        this.listaProd = data;
    }
      ),
      catchError(this.handleError)
    );
  }

  GetProduct(id : number):Observable<IProduct> {
    console.log(`id: ${id}`);
    const UrlProduct = this.ProdApiUrl + `/${id}`;
    return this.http.get<IProduct>(UrlProduct);
  }

 RemoveProduct(id : number): Observable<IProduct> {
   const deleteUrl = this.ProdApiUrl + `/${id}`;
   return this.http.delete<IProduct>(deleteUrl);
 }

 EditProduct(id : number, product : IProduct): Observable<IProduct> {
  console.log(`id: ${id}`);
  const UrlProduct = this.ProdApiUrl + `/${id}`;
  return this.http.put<IProduct>(UrlProduct, product);
 }

 AddProduct(product : IProduct): Observable<IProduct> {
  return this.http.post<IProduct>(this.ProdApiUrl, product);
 }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
      }
      else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
}
