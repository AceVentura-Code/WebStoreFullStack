import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketProductsService } from 'src/app/basket-products/basket-products.service';
import { IProduct } from 'src/app/Product';
import { ProductsRepoService } from 'src/app/products-repo.service';

@Component({
  selector: 'app-detail-updater',
  templateUrl: './detail-updater.component.html',
  styleUrls: ['./detail-updater.component.css']
})
export class DetailUpdaterComponent implements OnInit {
  product: IProduct = {id:0, name: "Not Found", description: "", price:0, rating: 0, imageUrl : '', mediaType: 'error', tags: [] };

  
  constructor(public repo: ProductsRepoService, public router : Router, public route : ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== undefined && id !== null) {
     this.repo.GetProduct(+id).subscribe({
      next: data => { 
      this.product = data;
      console.log(this.product)
      },
      error: err =>console.log(err)
      });
    }
  }

  OnSubmit(form: NgForm) : void {
    if( form.valid ){
      this.repo.EditProduct(this.product.id , this.product).subscribe(data => {console.log(data)});
    }
  }

}
