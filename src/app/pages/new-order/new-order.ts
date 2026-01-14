import { OrderApi, OrderModel } from '@/core/services/order-api';
import { OrderForm } from '@/features/order-form/order-form';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-new-order',
    imports: [OrderForm],
    providers: [MessageService],
    template: `
        <div class="new-order">
            <h2>Создание зелья</h2>
            @if (order) {
                <app-order-form
                    [order]="order"
                    (onSave)="save($event)"
                ></app-order-form>
            }
        </div>
    `,
    styles: `
        .new-order {
            max-width: 980px;
            margin: 0 auto;
        }
    `
})
export class NewOrder {
    order: OrderModel;

    constructor(
        private orderApi: OrderApi,
        private router: Router
    ) {
        this.order = orderApi.generateOrder();
    }

    save(order: OrderModel) {
        this.orderApi.post(order);
        this.router.navigate(['/order', order.id]);
    }
}
