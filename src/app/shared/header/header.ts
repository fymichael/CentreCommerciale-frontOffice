import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search';
import { ChangeDetectorRef } from '@angular/core';
import { Order } from '../../models/orders.model';
import { InvoiceService } from '../../services/invoice';

@Component({
  selector: 'app-header',
  imports: [MatIcon, RouterLink, RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLoading: boolean = false;
  Orders: Order[] = [];

  constructor(private searchService: SearchService, private cdr: ChangeDetectorRef, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.loadOrderByUserId('699f58ff5c3c546996f2844c');
  }

  async loadOrderByUserId(userId: string): Promise<void> {
    this.isLoading = true
    try {
      this.Orders = await this.invoiceService.getInvoiceByUserId(userId);
      this.isLoading = false;
      this.cdr.detectChanges(); 
    } catch (error) {
      console.error('Erreur lors du chargement des commandes de l\'utilisateur :', error);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  onSearch(term: string) {
    this.searchService.triggerSearch(term);
  }

}
