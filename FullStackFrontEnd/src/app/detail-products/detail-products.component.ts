import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketProductsService } from '../basket-products/basket-products.service';
import { IBasketItem, IProduct } from '../Product';
import { ProductsRepoService } from '../products-repo.service';
import { IUser } from '../user-login/IUser';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.css']
})
export class DetailProductsComponent implements OnInit {
  isLogIn = false;
  UserInfo: IUser | undefined;
  product: IProduct |undefined ;
  ProductNull : IProduct = {id:0, name: "Not Found", description: "", price:0, rating: 0, imageUrl : '', mediaType: 'error', tags: [] }

  BasketProduct: IBasketItem = {product: this.ProductNull, amount: 0}
  
  amount: number = 0;
  isAmountLoaded = false;
  constructor(public repo: ProductsRepoService, public router : Router, public route : ActivatedRoute, public basket: BasketProductsService) { }

  //ngOnInit(): void {
    // const userUnparsed = sessionStorage.getItem('UserLogIn')
    // if (userUnparsed !== undefined && userUnparsed !== null) {
    //   this.UserInfo = JSON.parse(userUnparsed);
    //   this.isLogIn = true;
    // }
    // else{
    //   this.UserInfo = {
    //     id: 0,
    //     name: 'Guest',
    //     passWord : '',
    //     email: '',
    //     accessLevel: 'userAccess',
    //   };
    // }
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id !== undefined && id !== null) {
    //  this.repo.GetProduct(+id).subscribe({
    //   next: data => { 
    //   //console.log("All: ", JSON.stringify(data));
    //   this.product = data;
    //   let productAmount : IBasketItem[] = this.basket.GetProductList();
    //   let prod = productAmount.find( p => p.product==this.product );
    //   if (prod !== undefined){
    //     this.amount = prod.amount
    //   }
    //   console.log(this.product)
    //   },
    //   error: err =>console.log(err)
    //   });
    // }
  //}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null){
      this.GetProductFromBasket(+id);
    }
    

  }

  GetProductFromBasket(id : number): void {
      let List = this.basket.GetProductList();
      let Prod = List.find( p => p.product.id == +id );
      if(Prod !== undefined && Prod !== null){
        this.BasketProduct = Prod;
        this.product = this.BasketProduct.product;
      }
      else{
         this.repo.GetProduct(id).subscribe(data => { 
             //   //console.log("All: ", JSON.stringify(data));
             let product = data;
             if (product != undefined ){
             let amount = 0;
             let Prod = {product: product, amount: amount}
             this.BasketProduct = Prod
             this.product = this.BasketProduct.product;
             }
            //  else{
            //    let 
            //   let amount = 0;
            //   let Prod = {product: ProductNull, amount: amount}
            //   this.BasketProduct = Prod
            //   this.product = this.BasketProduct.product;
            //  }
            }
         );
    }
}
   SaveAmount(){
    let List : IBasketItem[] = this.basket.GetProductList();
    //console.log(this.BasketProduct.product.id)
    let Prod = List.find( p => p.product.id == this.BasketProduct.product.id);
    console.log(Prod)
    console.log(this.BasketProduct.amount)
    if (Prod != undefined && Prod != null){
      let index = List.indexOf(Prod);
      console.log("Amount: " + this.BasketProduct.amount + "    Versus " + List[index].amount)
      List[index].amount = this.BasketProduct.amount;
      console.log("Updated amount: ", List[index].amount)
      this.basket.SetProductList(List);
    }
    else{
      List.push(this.BasketProduct);
      console.log("Pushed")
      this.basket.SetProductList(List);
    }
   }

  amountIncrement() : void {
    this.BasketProduct.amount += 1;
  }
  amountDecrement() : void {
    if (this.BasketProduct.amount > 0) {
      this.BasketProduct.amount -= 1;
    }

  }
  // SaveAmount() : void {
  //   let BasketList = this.basket.GetProductList();
  //   let prod = BasketList.find(p => p.product == this.product)
  //   if(prod != null && prod != undefined) {
  //     let index = BasketList.indexOf(prod);
  //     if(this.amount>0){
  //       BasketList[index].amount = this.amount;
  //       this.basket.SetProductList(BasketList);
  //     }
  //     else{
  //       BasketList = BasketList.filter(p => p.product !== this.product);
  //       this.basket.SetProductList(BasketList);
  //     }
  //   }
  //   else {
  //     let product = this.product;
  //     let amount = this.amount;
  //     if(product !== undefined && amount !== undefined){
  //       let BasketProduct: IBasketItem = { product, amount}
  //       BasketList.push(BasketProduct);
  //     }
  //     this.basket.SetProductList(BasketList);
  //   }

  //  }


}
