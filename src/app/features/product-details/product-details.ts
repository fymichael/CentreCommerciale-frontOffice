import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss'],
  imports: [CommonModule, Header, Footer]
})
export class ProductDetails implements OnInit {
  
  // Données statiques du produit (à remplacer par un appel API plus tard)
  public product: any = {
    id: 101,
    name: 'Nike Air Max 2017 - Performance Edition',
    price: 120000,
    category: 'Sport / Chaussures',
    image: 'images/NIKE+AIR+MAX+2017.avif',
    description: 'La chaussure de running Nike Air Max 2017 présente une empeigne Flymesh sans coutures pour un maintien optimal et une aération maximale. L\'amorti Max Air emblématique offre une sensation de légèreté et de souplesse à chaque pas.',
    stock: 15
  };

  // État local
  public quantity: number = 1;

  constructor() { }

  ngOnInit(): void {
    // Ici, tu pourrais récupérer l'ID depuis la route pour charger le bon produit
    // ex: this.route.snapshot.paramMap.get('id');
  }

  // Logique du sélecteur de quantité
  public increaseQty(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  public decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Action d'ajout au panier
  public addToCart(): void {
    const orderItem = {
      productId: this.product.id,
      name: this.product.name,
      unitPrice: this.product.price,
      totalPrice: this.product.price * this.quantity,
      qty: this.quantity
    };

    console.log('Produit ajouté au panier :', orderItem);
    
    // Alerte style Mantis (tu peux utiliser un MatSnackBar ici)
    alert(`Succès ! ${this.quantity} x ${this.product.name} ajouté(s) au panier.`);
  }
}