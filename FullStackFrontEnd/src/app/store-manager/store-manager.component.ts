import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../Product';
import { ProductsRepoService } from '../products-repo.service';

@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.component.html',
  styleUrls: ['./store-manager.component.css']
})
export class StoreManagerComponent implements OnInit {
  sub!: Subscription;
  ProductList : IProduct[] = [];
  constructor(public repo: ProductsRepoService,
    public router: Router) { }

  ngOnInit(): void {
    this.sub = this.repo.GetProducts().subscribe({
      next: data => { 
      this.ProductList = data;
      },
      error: err =>console.log(err)
      });
  }

  onDelete(id: number): void {
    this.repo.RemoveProduct(id).subscribe({
      next: data => {
        this.sub = this.repo.GetProducts().subscribe({
          next: data => { 
          this.ProductList = data;
          },
          error: err =>console.log(err)
          });
      },
      error: err =>console.log(err)
      });
  }
}
