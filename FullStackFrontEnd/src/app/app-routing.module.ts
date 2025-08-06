import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketProductsComponent } from './basket-products/basket-products.component';
import { PurchaseConfirmComponent } from './basket-products/purchase-confirm/purchase-confirm.component';
import { DetailProductsComponent } from './detail-products/detail-products.component';
import { InvalidComponentComponent } from './invalid-component/invalid-component.component';
import { ListFilterComponent } from './list-products/list-filter/list-filter.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { DetailUpdaterComponent } from './store-manager/detail-updater/detail-updater.component';
import { NewProductComponent } from './store-manager/new-product/new-product.component';
import { StoreManagerComponent } from './store-manager/store-manager.component';
import { SignUpComponent } from './user-login/sign-up/sign-up.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {path: 'products', component: ListProductsComponent},
  {path: 'products/:id', component: DetailProductsComponent},
  {path: 'product-search', component: ListFilterComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'basket', component: BasketProductsComponent},
  {path: 'purchase-confirmed', component: PurchaseConfirmComponent},
  {path: 'store-manager-mode', component: StoreManagerComponent},
  {path: 'store-manager-mode/new', component: NewProductComponent},
  {path: 'store-manager-mode/:id', component: DetailUpdaterComponent},
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: '**', component: InvalidComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
