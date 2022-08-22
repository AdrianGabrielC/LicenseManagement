import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit {
  products: Product[] = [];
  intervalId: any;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  readDB() {
    setTimeout(() => {
      this.productsService.getAllProducts().subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (response) => {
          console.log(response);
        },
      });
    }, 100);
  }
  deleteProduct(id: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) this.products.splice(i, 1);
    }
    this.productsService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
  refresh() {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
