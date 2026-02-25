import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-managment',
  imports: [Header, Footer, MatIconModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './cart-managment.html',
  styleUrl: './cart-managment.scss',
})
export class CartManagment {
  public item1Selected: boolean = false;
  public item2Selected: boolean = false;

  // Getter pour afficher le bouton global si l'un des deux est coché
  get showGlobalValidate(): boolean {
    return this.item1Selected || this.item2Selected;
  }
}
