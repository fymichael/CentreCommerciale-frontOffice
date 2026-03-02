import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ProductService } from '../../services/product';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { InvoiceService } from '../../services/invoice';
import { Storage } from '../../services/storage';
import { StorageModel } from '../../models/storage.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss'],
  standalone: true,
  imports: [CommonModule, Header, Footer, FormsModule, RouterModule]
})

export class ProductDetails implements OnInit {
  public product: any = null;
  public quantity: number = 1;
  public isLoading: boolean = true;
  public isAuthenticated: boolean = false;
  public storageItem: any = null; 
  public selectedColor: string = '';
  public selectedVariant: string = '';
  public userId = localStorage.getItem('user_id') || '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private invoiceService: InvoiceService,
    private storage: Storage,
    private router: Router
  ){}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    // Récupération dynamique de l'ID utilisateur (celui qu'on a passé par l'URL avant)
    const userId = localStorage.getItem('user_id');
    this.isAuthenticated = !!userId;

    if (productId) {
      this.loadData(productId);
    }
  }

  private async getNextReference(): Promise<string> {
    var nextRef = await this.invoiceService.getNextInvoiceReference();
    console.log('Référence suivante obtenue :', nextRef);
    return nextRef
  }

  // On centralise le chargement pour garantir l'ordre
  private async loadData(id: string) {
    this.isLoading = true;
    try {
      // 1. Charger le produit
      const productData = await this.productService.getProductsById(id).toPromise();
      this.product = productData;

      // 2. Charger le stock (en attendant que le produit soit là)
      const stockArray = await this.storage.getStockByProductId(id);
      
      // On extrait l'objet du tableau [0] comme vu dans ton log
      this.storageItem = Array.isArray(stockArray) ? stockArray[0] : stockArray;
      localStorage.setItem(this.storageItem?.product_id?._id || '', this.storageItem?.quantity || '0');

      console.log('Données chargées. Stock dispo:', this.storageItem?.quantity);
      
      this.isLoading = false;
      this.cd.detectChanges();
    } catch (err) {
      console.error('Erreur de chargement:', err);
      this.isLoading = false;
      this.cd.detectChanges();
    }
  }

  public increaseQty(): void {
    const stockDisponible = this.storageItem?.quantity || 0;
    
    // Correction de la condition : on autorise jusqu'à la limite du stock (max 20)
    if (this.quantity < 20 && this.quantity < stockDisponible) { 
      this.quantity++;
    } else if (this.quantity >= stockDisponible) {
      console.warn("Stock maximum atteint");
    }
  }

  public decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

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
      user_id: this.userId,
      // On ajoute les sélections ici !
      specifications: `${this.selectedColor} - ${this.selectedVariant}`,
      state: 1
    };

    console.log('Produit complet ajouté au panier :', orderItem);
    this.invoiceService.createInvoice(orderItem);
    this.router.navigate(['/cart']);
    //alert(`Ajouté : ${this.product.name} (${this.selectedColor}, ${this.selectedVariant})`);
  }
}