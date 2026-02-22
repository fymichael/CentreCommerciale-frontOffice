import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductFilter } from '../../shared/product-filter/product-filter';
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


@Component({
  selector: 'app-product-list',
  imports: [ProductFilter, MatCard, MatCardContent, CommonModule, MatIconModule, Header, Footer],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    selectedCategoryId: string = '';
    
    isLoading: boolean = true;

    constructor(private productService: ProductService, private cd: ChangeDetectorRef, private categoryService: CategoryService, private searchService: SearchService) {}

    ngOnInit(): void {
      this.searchService.search$.subscribe(term => {
        this.executeSearch(term);
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
      if (!term.trim()) return; // Ne rien faire si c'est vide

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
}