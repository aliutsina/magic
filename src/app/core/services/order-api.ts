import { Injectable } from '@angular/core';
import { StorageApi } from './storage-api';

export interface OrderAddressModel {
    country: string;
    city: string;
    zip: string;
    street: string;
    house: string;
    building?: string;
    flat?: string;
}

export interface OrderIngredientModel {
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
}

export interface OrderModel {
    id: number;
    customerId: string;
    createAt: number;
    dueDate: number;
    address: OrderAddressModel;
    deliveryMethod: string;
    paymentMethod: string;
    ingredients: OrderIngredientModel[];
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class OrderApi {
    readonly api;
    orders: OrderModel[] = [];

    constructor() {
        this.api = new StorageApi<OrderModel[]>('orders', []);
        this.orders = this.api.get();
    }

    private generateNewId() {
        const lastId = this.orders.reduce(
            (lastId, { id }) => (lastId > id ? lastId : id),
            -1
        );

        return lastId === -1 ? 1 : lastId + 1;
    }

    generateOrder(): OrderModel {
        const now = Date.now();

        return {
            id: this.generateNewId(),
            customerId: '',
            createAt: now,
            dueDate: now,
            address: {
                country: '',
                city: '',
                zip: '',
                street: '',
                house: ''
            },
            deliveryMethod: '',
            paymentMethod: '',
            total: 0,
            ingredients: []
        };
    }

    post(order: OrderModel) {
        this.orders.push(order);
        this.api.save(this.orders);

        return order;
    }

    update(updatedOrder: OrderModel) {
        const updatedOrders = this.orders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
        );
        this.api.save(updatedOrders);

        return updatedOrders;
    }

    get(id: number) {
        return this.orders.find((order) => order.id === id);
    }

    list() {
        return this.orders;
    }
}
