import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Importé pour l'ID
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ProductService } from '../../services/product';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core'; // Import à ajouter

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss'],
  standalone: true,
  imports: [CommonModule, Header, Footer, FormsModule]
})
export class ProductDetails implements OnInit {
  
  public product: any = null; // Initialisé à null en attendant l'API
  public quantity: number = 1;
  public isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    // 1. Récupérer l'ID dans l'URL
    const productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);

    if (productId) {
      this.loadProduct(productId);
    }
  }

  private loadProduct(id: string): void {
    this.isLoading = true;
    this.productService.getProductsById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
        console.log(data);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement du produit', err);
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  public increaseQty(): void {
    // Note : On utilise 'state' ou un nombre fixe car ton type n'a pas de champ 'stock' explicite
    if (this.quantity < 20) { 
      this.quantity++;
    }
  }

  public decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  public selectedColor: string = '';
  public selectedSize: string = '';

  // Appelé quand on clique sur une couleur
  selectColor(color: string) {
    this.selectedColor = color;
  }

  // Appelé quand on clique sur une taille
  selectSize(size: string) {
    this.selectedSize = size;
  }

  public addToCart(): void {
    if (!this.product) return;

    // Vérification : on force l'utilisateur à choisir s'il y a des options
    if (this.product.color && !this.selectedColor) {
      alert("Veuillez choisir une couleur");
      return;
    }
    if (this.product.stockage && !this.selectedSize) {
      alert("Veuillez choisir une taille/option");
      return;
    }

    const orderItem = {
      productId: this.product._id,
      name: this.product.name,
      unitPrice: this.product.unit_price,
      totalPrice: this.product.unit_price * this.quantity,
      qty: this.quantity,
      image: this.product.image,
      // On ajoute les sélections ici !
      color: this.selectedColor,
      size: this.selectedSize
    };

    console.log('Produit complet ajouté au panier :', orderItem);
    alert(`Ajouté : ${this.product.name} (${this.selectedColor}, ${this.selectedSize})`);
  }
}