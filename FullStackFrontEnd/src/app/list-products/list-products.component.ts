import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BasketProductsService } from '../basket-products/basket-products.service';
import { IBasketItem, IProduct } from '../Product';
import { ProductsRepoService } from '../products-repo.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  sub!: Subscription;
  ProductList : IProduct[] = [];
  BasketListShow: IBasketItem[] = [];
  BasketListKeep: IBasketItem[] = [];
  constructor(public repo: ProductsRepoService, public basket: BasketProductsService,public router: Router) { }

  ngOnInit(): void {
    this.BasketListKeep = this.basket.GetProductList()
    this.sub = this.repo.GetProducts().subscribe({
        next: data => {
            this.ProductList = data;
            //let productAmount: IBasketItem[] = this.basket.GetProductList()
            this.ProductList.forEach(product => {
                    let amount: number; //= 0;
                    let onBasket = this.BasketListKeep.find(productIn => {
                        return productIn.product.id == product.id
                    });
                    if (onBasket != null && onBasket != undefined) {
                        amount = onBasket.amount;
                    } else {
                        amount = 0;
                    }
                    let newItem: IBasketItem = {product,amount};
                    this.BasketListShow.push(newItem);
                })

            console.log(this.BasketListShow);
            console.log("Loading Complete");
        },
        error: err => console.log(err)
    });
  }

  AddToBasket(product : IProduct, amount: number): void {
    if(amount > 0) {
      let ProdForBasket : IBasketItem = {product, amount};
      let p = this.BasketListKeep.find(p => p.product.id == ProdForBasket.product.id);
      if(p == null || p == undefined){ 
        this.BasketListKeep.push(ProdForBasket); 
      }
      else{
        let index = this.BasketListKeep.indexOf(p);
        this.BasketListKeep[index].amount = amount;
      }
    }
    // else{
    //   this.BasketListKeep = this.BasketListKeep.filter(p=>{p.amount>0})
    // }
    this.basket.SetProductList(this.BasketListKeep)
  }

  ConfirmAll(): void {
    this.BasketListKeep = [];
    this.BasketListShow.forEach(pShow => {
        if(pShow.amount > 0){
          let prod = this.BasketListKeep.find( pKeep => pKeep.product == pShow.product );
          if(prod !== undefined && prod !== null){
            let index = this.BasketListKeep.indexOf(prod);
            this.BasketListKeep[index].amount = pShow.amount
          }
          if(prod == undefined || prod == null){
            this.BasketListKeep.push(pShow);
          }
        }
    });
    this.BasketListKeep.forEach((element,index)=>{
      if(element.amount==0) this.BasketListKeep.splice(index,1);
    });
    console.log(this.BasketListKeep)
    this.basket.SetProductList(this.BasketListKeep);
    // this.BasketListKeep = {...this.BasketListShow};
    // // let test : IBasketItem[] = {...test}
    // this.BasketListKeep = this.BasketListKeep.filter( p => p.amount > 0 );
  }

  amountIncrement(product : IBasketItem) : void {
    product.amount = product.amount + 1;
    }
  amountDecrement(product : IBasketItem) : void {
    if(product.amount > 0) {
      product.amount = product.amount - 1;
    }
  }
}
