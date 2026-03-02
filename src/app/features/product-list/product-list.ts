import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category';
import { SearchService } from '../../services/search';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ MatCard, MatCardContent, CommonModule, MatIconModule, Header, Footer, FormsModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    selectedCategoryId: string = '';
    
    isLoading: boolean = true;
    activeSearched: boolean = false;
    searchedTerm: string = '';

    filterValues = {
      minPrice: 0,
      maxPrice: 0
    };

    constructor(private productService: ProductService, private cd: ChangeDetectorRef, private categoryService: CategoryService, private searchService: SearchService, private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const userId = params['user_id'];
        if (userId) {
          console.log('User ID récupéré de l\'autre app :', userId);
          localStorage.setItem('user_id', userId);
        }
      });

      this.searchService.search$.subscribe(term => {
        this.executeSearch(term);
        this.activeSearched = true;
        this.searchedTerm = term;
      });

      this.loadCategories();
      this.productService.getProducts().subscribe({
        next: (data) => {
          this.products = data;
          this.isLoading = false;
          this.cd.detectChanges();
          console.log(data);
        },
        error: (err) => {
          console.error('Erreur SQL/Mongo:', err);
          this.isLoading = false;
          this.cd.detectChanges();
        }
      });
    }

    isNewProduct(product: Product): boolean {
      const createdAt = new Date(product.createdAt!);
      const now = new Date();
      const diffInDays = (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24);
      return diffInDays <= 1; 
    }

    loadCategories() {
      this.categoryService.getCategories().subscribe({
        next: (data) => {
          this.categories = data;
          this.cd.detectChanges();
          console.log(data);
        },
        error: (err) => {
          console.error('Erreur SQL/Mongo:', err);
          this.cd.detectChanges();
        }
      });
    }

    filterByCategory(idCategory: string) {
      this.selectedCategoryId = idCategory;

      this.productService.getProductsByCategory(idCategory).subscribe({
        next: (data) => {
          if (data.length === 0) {
            console.warn('Aucun produit trouvé pour la catégorie :', idCategory);
            this.products = [];
            this.isLoading = false;
            this.cd.detectChanges();
            return; 
          }
          this.products = data;
          this.isLoading = false;
          this.cd.detectChanges();
          console.log(data);
        },
        error: (err) => {
          console.error('Erreur SQL/Mongo:', err);
          this.cd.detectChanges();
          this.isLoading = false;
        }
      });
    }

    executeSearch(term: string) {
      if (!term.trim()) return;
      this.isLoading = true;

      console.log('Recherche en cours pour :', term);
      
      this.productService.searchProduct(term).subscribe({
        next: (results: any) => {
          this.products = results;
          this.isLoading = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          this.isLoading = false;
          this.cd.detectChanges();
           if (err.status === 404) {
            console.warn('Aucun résultat trouvé pour :', term);
            this.products = [];
            return; 
        }
        }});
    }

    applyFilters() {
      console.log('Filtres envoyés au backend :', this.filterValues);
      this.isLoading = true;
      this.productService.filterProduct(this.filterValues.minPrice, this.filterValues.maxPrice).subscribe({
          next: (res: any) => {
            this.products = res; 
            
            this.isLoading = false;
            this.cd.detectChanges();
            
            console.log('Produits filtrés : ', res);
            
          },
          error: (err) => {
            console.error('Erreur :', err);
            this.isLoading = false;
            this.cd.detectChanges();
          }
        });
    }

  filters = {
    search: '',
    categories: {
      electronique: false,
      mode: false,
      maison: false
    },
    maxPrice: 1000,
    condition: 'all'
  };


  resetFilters() {
    this.filters = {
      search: '',
      categories: {
        electronique: false,
        mode: false,
        maison: false
      },
      maxPrice: 1000,
      condition: 'all'
    };
  }
}