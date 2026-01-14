import { OrderModel, OrderApi } from '@/core/services/order-api';
import { OrderForm } from '@/features/order-form/order-form';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [Toast, OrderForm, ProgressSpinnerModule],
    providers: [MessageService],
    template: `
        @if (order) {
            <h2>Редактирование зелья</h2>
            <app-order-form
                [order]="order"
                (onSave)="save($event)"
            ></app-order-form>
        } @else {
            <div class="order-spinner-wrapper">
                <p-progress-spinner />
            </div>
        }
        <p-toast position="bottom-right" key="message-success" />
    `,
    styles: `
        .order {
            &-spinner-wrapper {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    `
})
export class Order {
    order: OrderModel | undefined = undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderApi: OrderApi,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
            this.order = this.orderApi.get(id);
        }

        if (!this.order) {
            this.router.navigate(['/notFound']);
        }
    }

    save(order: OrderModel) {
        this.orderApi.update(order);
        this.messageService.add({
            severity: 'success',
            summary: 'Ура',
            detail: 'Заказ обновлен',
            key: 'message-success',
            life: 3000
        });
    }
}
