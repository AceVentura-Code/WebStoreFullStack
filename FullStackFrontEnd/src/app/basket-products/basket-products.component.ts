import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderManagerService } from '../order-manager.service';
import { IBasketItem } from '../Product';
import { ProductsRepoService } from '../products-repo.service';
import { LoginService } from '../user-login/login.service';
import { BasketProductsService } from './basket-products.service';
import { IUser } from '../user-login/IUser';
import { IOrder } from '../IOrder';


@Component({
  selector: 'app-basket-products',
  templateUrl: './basket-products.component.html',
  styleUrls: ['./basket-products.component.css']
})
export class BasketProductsComponent implements OnInit {
  BasketList : IBasketItem[] = [];

  constructor(public repo: ProductsRepoService, public basket: BasketProductsService,
     public router : Router, private login: LoginService, public orders: OrderManagerService) { }

  ngOnInit(): void {
    this.BasketList = this.basket.GetProductList();
    console.log(this.BasketList);
  }

  
  amountIncrement(product : IBasketItem) : void {
    let index  = this.BasketList.indexOf(product);
    this.BasketList[index].amount += 1;
  }
  amountDecrement(product : IBasketItem) : void {
    let index  = this.BasketList.indexOf(product);
    if (this.BasketList[index].amount >= 1){
      this.BasketList[index].amount -= 1;
      console.log("this.BasketList[index].amount");
      console.log(this.BasketList[index].amount);
    }

  }

  OnUpdate() : void {
      this.BasketList = this.BasketList.filter(item => item.amount > 0);
    let UpdateBasket :IBasketItem[] = []
    this.BasketList.forEach(item => {if (item.amount >= 1){
      UpdateBasket.push(item);
    }
    })
    console.log(UpdateBasket);
    this.BasketList = [];
    this.BasketList = UpdateBasket;
    console.log('Updated')
    this.basket.SetProductList(this.BasketList);
    this.router.navigateByUrl('/basket')
  }

  OnBuy() : void {
    this.OnUpdate();
    let LoginCheck = sessionStorage.getItem('UserLogIn');
    if(LoginCheck == null || LoginCheck == undefined){
      this.router.navigateByUrl("/login");
    }
    else{
      //do send to DB
      let user : IUser = JSON.parse(LoginCheck);
      if(user.address == null || user.address == undefined){
        user.address = 'None given'
      };
      let order : IOrder = {
        id : 0,
        userId : user.id,
        productsInTheCart : this.BasketList,
        orderDate : new Date(),
        shippingAddress : user.address,
        status : 'Processing',
      };
      this.orders.registerOrder(order).subscribe(data => {console.log(data)});
      this.router.navigateByUrl("/purchase-confirmed");
    }
  }

}
