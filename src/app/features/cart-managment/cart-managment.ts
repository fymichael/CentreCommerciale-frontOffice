import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-managment',
  imports: [Header, Footer, MatIconModule, RouterModule],
  templateUrl: './cart-managment.html',
  styleUrl: './cart-managment.scss',
})
export class CartManagment {

}
