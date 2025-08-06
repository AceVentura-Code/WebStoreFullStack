import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Product';
import { ProductsRepoService } from 'src/app/products-repo.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})

export class NewProductComponent implements OnInit {

  productNew: IProduct = {id:0, name: "New Product Name", description: "New Product Description", price:0, rating: 0, imageUrl : '', mediaType: 'error', tags: [] };
  
  constructor(public repo: ProductsRepoService, public router : Router, public route : ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  OnSubmit(form: NgForm) : void {
    if( form.valid ){
      this.repo.AddProduct(this.productNew).subscribe(data => {console.log(data)});
    }
  }

}
