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
      maxPrice: 0,
      condition: 'all'
    };

    constructor(private productService: ProductService, private cd: ChangeDetectorRef, private categoryService: CategoryService, private searchService: SearchService) {}

    ngOnInit(): void {
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

      console.log('Recherche en cours pour :', term);
      
      this.productService.searchProduct(term).subscribe({
        next: (results: Product[]) => {
          this.products = results;
          this.cd.detectChanges();
          this.isLoading = false;
        },
        error: (err) => console.error(err)
      });
    }

    applyFilters() {
      console.log('Filtres envoyés au backend :', this.filterValues);
      
      this.productService.filterProduct(this.filterValues.minPrice, this.filterValues.maxPrice).subscribe({
          next: (data) => {
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