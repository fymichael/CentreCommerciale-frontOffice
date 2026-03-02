import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  async getStockByProductId(productId: string): Promise<number> {
    try {
      const response = await fetch(`https://centre-commerciale-backend.vercel.app/storages/state/${productId}`);
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du stock : ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération du stock :', error);
      return 0;
    }
  }
}
