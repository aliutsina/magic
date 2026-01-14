import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/layout';
import { Notfound } from './app/pages/notfound/notfound';
import { Orders } from '@/pages/orders/orders';
import { Order } from '@/pages/order/order';
import { NewOrder } from '@/pages/new-order/new-order';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'orders', component: Orders },
            { path: 'order/new', component: NewOrder },
            { path: 'order/:id', component: Order }
        ]
    },

    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
