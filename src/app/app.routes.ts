import { Routes } from '@angular/router';
import { ProductList } from './features/product-list/product-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
    },
    {
        path: 'Home',
        component: ProductList
    }
];
