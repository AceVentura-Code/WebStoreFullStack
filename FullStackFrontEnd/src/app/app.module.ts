import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { DetailProductsComponent } from './detail-products/detail-products.component';
import { InvalidComponentComponent } from './invalid-component/invalid-component.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { BasketProductsComponent } from './basket-products/basket-products.component';
import { SignUpComponent } from './user-login/sign-up/sign-up.component';
import { PurchaseConfirmComponent } from './basket-products/purchase-confirm/purchase-confirm.component';
import { StoreManagerComponent } from './store-manager/store-manager.component';
import { DetailUpdaterComponent } from './store-manager/detail-updater/detail-updater.component';
import { NewProductComponent } from './store-manager/new-product/new-product.component';
import { ListFilterComponent } from './list-products/list-filter/list-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    DetailProductsComponent,
    InvalidComponentComponent,
    UserLoginComponent,
    BasketProductsComponent,
    SignUpComponent,
    PurchaseConfirmComponent,
    StoreManagerComponent,
    DetailUpdaterComponent,
    NewProductComponent,
    ListFilterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
