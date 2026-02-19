import { Component, OnInit } from '@angular/core';
import { ProductFilter } from '../../shared/product-filter/product-filter';
import { MatCard, MatCardContent } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductFilter, MatCard, MatCardContent, CommonModule, MatIconModule, Header, Footer],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
    products: Product[] = [];
    isLoading: boolean = true;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
      this.productService.getProducts().subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (err) => {
          console.error('Erreur SQL/Mongo:', err);
        }
      });
      this.isLoading = false;
    }

}