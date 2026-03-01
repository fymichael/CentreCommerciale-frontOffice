import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
    },
    {
        path: 'Home',
        // Charge le composant UNIQUEMENT quand l'utilisateur va sur /Home
        loadComponent: () => import('./features/product-list/product-list').then(m => m.ProductList)
    },
    { 
        path: 'product-details/:id', 
        loadComponent: () => import('./features/product-details/product-details').then(m => m.ProductDetails) 
    },
    {
        path: 'cart',
        loadComponent: () => import('./features/cart-managment/cart-managment').then(m => m.CartManagment)
    },
    {
        path: 'order-tracking',
        loadComponent: () => import('./features/order-managment/order-managment').then(m => m.OrderManagment)
    }
];