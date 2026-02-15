import { Component } from '@angular/core';
import { ProductFilter } from '../../shared/product-filter/product-filter';
import { MatCard, MatCardContent } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-product-list',
  imports: [ProductFilter, MatCard, MatCardContent, CommonModule, MatIconModule, Header, Footer],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  products = [
    {
      name: 'Chaussures Sport',
      price: 120000,
      image: 'images/NIKE+AIR+MAX+2017.avif'
    },
    {
      name: 'Sac à dos',
      price: 80000,
      image: 'images/sac.jpeg'
    },
    {
      name: 'Montre élégante',
      price: 150000,
      image: 'https://via.placeholder.com/300'
    },
    {
      name: 'Casque audio',
      price: 95000,
      image: 'https://via.placeholder.com/300'
    },
    {
      name: 'T-shirt tendance',
      price: 30000,
      image: 'https://via.placeholder.com/300'
    },
    {
      name: 'Ordinateur portable',
      price: 2500000,
      image: 'https://via.placeholder.com/300'
    }
  ];
}