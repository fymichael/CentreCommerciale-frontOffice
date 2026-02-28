import { Injectable } from '@angular/core';
import { Order } from '../models/orders.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = 'https://centre-commerciale-backend.vercel.app';

  async UpdateInvoice(orderId: string, updatedData: Partial<Order>): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/invoices/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour de la commande : ${response.statusText}`);
      }

      const invoiceData = await response.json();
      console.log('Commande mise à jour avec succès :', invoiceData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la commande :', error);
    }
  }

  async createInvoice(orderItem: any): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderItem),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la création de la commande : ${response.statusText}`);
      }

      const invoiceData = await response.json();
      console.log('Commande créée avec succès :', invoiceData);
    } catch (error) {
      console.error('Erreur lors de la création de la commande :', error);
    }
  }

  async getNextInvoiceReference(): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}/invoices/latest`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération de la dernière commande : ${response.statusText}`);
      }

      const invoiceData = await response.json();
      console.log('Dernière commande récupérée avec succès :', invoiceData);
      return invoiceData;
    } catch (error) {
      console.error('Erreur lors de la récupération de la dernière commande :', error);
      return '';
    }
  }

  async getInvoiceByUserId(userId: string): Promise<Order[]> {
    try {
      const response = await fetch(`${this.apiUrl}/invoices/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des commandes de l'utilisateur : ${response.statusText}`);
      }
      
      const invoiceData = await response.json();
      return invoiceData;
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes de l\'utilisateur :', error);
      throw error;
    }
  }
}