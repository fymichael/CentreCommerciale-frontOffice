import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../services/invoice';
import { Order } from '../../models/orders.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart-managment',
  imports: [Header, Footer, MatIconModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './cart-managment.html',
  styleUrl: './cart-managment.scss',
})
export class CartManagment {
  Orders: Order[] = [];
  UnpaidOrders: Order[] = [];
  isLoading: boolean = false;

  constructor(private invoiceService: InvoiceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadOrderByUserId('699f58ff5c3c546996f2844c');
  }

  async loadOrderByUserId(userId: string): Promise<void> {
    this.isLoading = true
    try {
      this.Orders = (await this.invoiceService.getInvoiceByUserId(userId)).filter(order => order.state > 0);
      this.UnpaidOrders = this.Orders.filter(order => order.state === 1);
      console.log('Commandes de l\'utilisateur chargées avec succès :', this.Orders);
      this.isLoading = false;
      this.cdr.detectChanges(); 
    } catch (error) {
      console.error('Erreur lors du chargement des commandes de l\'utilisateur :', error);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  async validateOrder(): Promise<void> {
    try {
      for (const order of this.UnpaidOrders) {
        if (order._id) {
          await this.invoiceService.UpdateInvoice(order._id, { state: 5 });
        }
      }
      console.log('Toutes les commandes ont été validées avec succès.');
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la validation des commandes :', error);
    }
  }

  decreaseQty(order: Order): void {
    if (order.quantity > 1) {
      this.invoiceService.UpdateInvoice(order._id!, { quantity: order.quantity - 1 }).then(() => {
        order.quantity--;
        this.cdr.detectChanges();
      }).catch(error => {
        console.error('Erreur lors de la mise à jour de la quantité :', error);
      });
    }
  }

  increaseQty(order: Order): void {
    this.invoiceService.UpdateInvoice(order._id!, { quantity: order.quantity + 1 }).then(() => {
      order.quantity++;
      this.cdr.detectChanges();
    }).catch(error => {
      console.error('Erreur lors de la mise à jour de la quantité :', error);
    });
  }

  getStatusConfig(state: number) {
    const configs: any = {
      0: { label: 'Annulé', class: 'status-canceled' },
      1: { label: 'En attente de paiement', class: 'status-pending' },
      5: { label: 'Paiement validé', class: 'status-paymentValidate' },
      10: { label: 'En cours de préparation', class: 'status-preparation' },
      15: { label: 'Colis en cours de livraison', class: 'status-shipped' },
      20: { label: 'Livré', class: 'status-delivered' }
    };
    return configs[state] || { label: 'Inconnu', class: 'status-unknown' };
  }

  deleteOrder(orderId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.invoiceService.UpdateInvoice(orderId, { state: 0 }).then(() => {
        this.Orders = this.Orders.filter(order => order._id !== orderId);
        this.UnpaidOrders = this.UnpaidOrders.filter(order => order._id !== orderId);
        this.cdr.detectChanges();
      }).catch(error => {
        console.error('Erreur lors de la suppression de la commande :', error);
      });
    }
  }

  trackByFn(index: number, item: Order): string {
    return item._id || index.toString(); // Utilisez l'identifiant unique de l'article pour le suivi
  }
}
