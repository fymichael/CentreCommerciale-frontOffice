import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://huge-geckos-exist.loca.lt:5000/products';
  private prodCategoryUrl = 'https://huge-geckos-exist.loca.lt:5000/products/category'
  private searchUrl = 'https://huge-geckos-exist.loca.lt:5000/products/search?q=';

  constructor(private http: HttpClient) { }

  
  // GET ALL
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // CREATE
  createProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, formData);
  }

  // GET PODUCT BY Category
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    const url = `${this.prodCategoryUrl}/${categoryId}`; 
    
    return this.http.get<Product[]>(url);
  }
  
  // SEARCH Product
  searchProduct(term: string): Observable<Product[]> {
    const url = `${this.searchUrl}+${term}`;

    return this.http.get<Product[]>(url);
  }
}