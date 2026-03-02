import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://centre-commerciale-backend.vercel.app/products';
  private prodCategoryUrl = 'http://localhost:5000/products/category'
  private searchUrl = 'http://localhost:5000/products/search?q=';
  private filterUrl = 'http://localhost:5000/products/filter';

  constructor(private http: HttpClient) { }

  
  // GET ALL
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // GET BY ID
  getProductsById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    console.log(url);
    return this.http.get<Product>(url);
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

  // Filter Product
  filterProduct(minPrice: number, maxPrice: number) {
    console.log(`${this.filterUrl}?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    const url = `${this.filterUrl}?minPrice=${minPrice}&maxPrice=${maxPrice}`;

    return this.http.get<Product[]>(url);
  }
}