import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ProductService } from '../../services/product';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { InvoiceService } from '../../services/invoice';

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
    private cd: ChangeDetectorRef,
    private invoiceService: InvoiceService
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

  private async getNextReference(): Promise<string> {
    var nextRef = await this.invoiceService.getNextInvoiceReference();
    console.log('Référence suivante obtenue :', nextRef);
    return nextRef
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
  public selectedVariant: string = '';

  // Appelé quand on clique sur une couleur
  selectColor(color: string) {
    this.selectedColor = color;
  }

  // Appelé quand on clique sur une taille
  selectSize(size: string) {
    this.selectedVariant = size;
  }

  public async addToCart(): Promise<void> {
    if (!this.product) return;

    // Vérification : on force l'utilisateur à choisir s'il y a des options
    if (this.product.color && !this.selectedColor) {
      alert("Veuillez choisir une couleur");
      return;
    }
    if (this.product.variant && !this.selectedVariant) {
      alert("Veuillez choisir une variante");
      return;
    }

    const orderItem = {
      reference: await this.getNextReference(),
      product_id: this.product._id,
      unit_price: this.product.unit_price,
      quantity: this.quantity,
      user_id: '699f58ff5c3c546996f2844c',
      // On ajoute les sélections ici !
      specifications: `${this.selectedColor} - ${this.selectedVariant}`,
      state: 1
    };

    console.log('Produit complet ajouté au panier :', orderItem);
    this.invoiceService.createInvoice(orderItem);
    alert(`Ajouté : ${this.product.name} (${this.selectedColor}, ${this.selectedVariant})`);
  }
}