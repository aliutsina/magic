import { Component } from '@angular/core';
import { OrderApi, OrderModel } from '@/core/services/order-api';
import { Card, CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { Button } from 'primeng/button';
import localeRu from '@angular/common/locales/ru';
import { DatePipe, registerLocaleData } from '@angular/common';

registerLocaleData(localeRu);

@Component({
    selector: 'app-orders',
    imports: [CardModule, RouterModule, Card, DatePipe],
    template: `
        <div class="orders-wrapper">
            <a [routerLink]="['/order/new']" tabindex="0" class="orders-new">
                <p-card class="w-full h-full">
                    <i class="pi pi-plus" style="font-size: 4rem"></i>
                </p-card>
            </a>
            @for (order of orders; track order.id) {
                <a [routerLink]="['/order', order.id]" tabindex="0">
                    <p-card class="w-full h-full">
                        <ng-template #subtitle> {{ order.id }} </ng-template>

                        <p>
                            Доставка: {{ order.dueDate | date: 'dd.MM.yyyy' }}
                        </p>
                        <ng-template #footer>
                            Сумма: {{ order.total }}
                        </ng-template>
                    </p-card>
                </a>
            }
        </div>
    `,
    styles: `
        .orders {
            &-new {
                width: 100%;
                display: flex;
                align-items: stretch;
                justify-content: stretch;
                text-align: center;
            }

            &-wrapper {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 16px;

                @media (max-width: 1024px) {
                    grid-template-columns: repeat(3, 1fr);
                }

                @media (max-width: 600px) {
                    grid-template-columns: repeat(2, 1fr);
                }

                @media (max-width: 480px) {
                    grid-template-columns: 1fr;
                }
            }
        }
    `
})
export class Orders {
    orders: OrderModel[] = [];

    constructor(private orderApi: OrderApi) {}
    ngOnInit() {
        this.orders = this.orderApi.list();
    }
}
