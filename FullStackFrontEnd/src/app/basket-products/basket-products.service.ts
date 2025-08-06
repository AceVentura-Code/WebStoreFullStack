import { Injectable } from '@angular/core';
import { IBasketItem, IProduct } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class BasketProductsService {

  productBasket: IBasketItem[] = [];
  constructor() { }

  GetProductList():IBasketItem[] {
    const Basket = localStorage.getItem('Basket');
    if (Basket != null && Basket != undefined) {
      this.productBasket =JSON.parse(Basket);
    }
    return this.productBasket
  }

  SetProductList(productBasket: IBasketItem[]): void {
    productBasket = productBasket.filter(item => item.amount > 0);
    localStorage.setItem('Basket', JSON.stringify(productBasket));
  }

  AddToBasket(product: IProduct, amount: number): void {
    const BasketList = this.GetProductList()
    if(BasketList != null && BasketList != undefined){
      this.productBasket = BasketList
    }
    let newBasket : IBasketItem = {product, amount};
    const findTest = this.productBasket.find(p => p.product == newBasket.product);
    //let index = this.productBasket.indexOf(newBasket);
    if (!findTest){
      this.productBasket.push(newBasket);
    }
    else{
      let index = this.productBasket.indexOf(newBasket);
      this.productBasket[index].amount = newBasket.amount;
    }
    this.SetProductList(this.productBasket)
  }

}
