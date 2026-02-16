import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-managment',
  imports: [Header, Footer, MatIconModule],
  templateUrl: './order-managment.html',
  styleUrl: './order-managment.scss',
})
export class OrderManagment {

}
