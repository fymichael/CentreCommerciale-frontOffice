import { Routes } from '@angular/router';
import { ProductList } from './features/product-list/product-list';
import { ProductDetails } from './features/product-details/product-details';
import { CartManagment } from './features/cart-managment/cart-managment';
import { OrderManagment } from './features/order-managment/order-managment';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
    },
    {
        path: 'Home',
        component: ProductList
    },
    {
        path: 'product-details',
        component: ProductDetails
    },
    {
        path: 'cart',
        component: CartManagment
    },
    {
        path: 'order-tracking',
        component: OrderManagment
    }
];
