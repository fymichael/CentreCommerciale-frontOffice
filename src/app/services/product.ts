import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/products';

  constructor(private http: HttpClient) { }

  
  // GET ALL
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // CREATE
  createProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, formData);
  }
}