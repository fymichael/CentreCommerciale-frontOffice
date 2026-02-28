import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
    private apiUrl = 'https://centre-commerciale-backend.vercel.app/categorys';
    
    constructor(private http: HttpClient) { }

    /**
     Get concerned category of product
     */
    getCategoryById(id: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    // GET ALL
    getCategories(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    }
}
