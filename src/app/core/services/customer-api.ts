import { Injectable } from '@angular/core';
import { StorageApi } from './storage-api';

export interface CustomerModel {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
}

const MOCK_CUSTOMERS: CustomerModel[] = [
    {
        id: '1',
        fullName: 'Анна Ковалева',
        email: 'anna.kovaleva@mail.by',
        phone: '+375291112233'
    },
    {
        id: '2',
        fullName: 'Алевтина Юревич',
        email: 'alya.yurevich@gmail.com',
        phone: '+375296965682'
    },
    {
        id: '3',
        fullName: 'Екатерина Новик',
        email: 'ekaterina.novik@mail.by',
        phone: '+375336667788'
    },
    {
        id: '4',
        fullName: 'Алексей Морозов',
        email: 'alex.morozov@gmail.com'
    },
    {
        id: '5',
        fullName: 'Дмитрий Савицкий',
        email: 'd.savitsky@gmail.com'
    },
    {
        id: '6',
        fullName: 'Илья Захаров',
        email: 'ilya.zakharov@gmail.com'
    },
    {
        id: '7',
        fullName: 'Наталья Беляева',
        email: 'n.belyaeva@mail.by',
        phone: '+375295551010'
    },
    {
        id: '8',
        fullName: 'Сергей Литвинов',
        email: 'sergey.litvinov@gmail.com'
    },
    {
        id: '9',
        fullName: 'Мария Климова',
        email: 'maria.klimova@mail.by'
    },
    {
        id: '10',
        fullName: 'Владимир Петренко',
        email: 'v.petrenko@gmail.com',
        phone: '+375339991122'
    }
];

@Injectable({
    providedIn: 'root'
})
export class CustomerApi {
    readonly api;
    costumers: CustomerModel[];

    constructor() {
        this.api = new StorageApi<CustomerModel[]>('customers', MOCK_CUSTOMERS);
        this.costumers = this.api.get();
    }

    get(): CustomerModel[] {
        return this.costumers;
    }

    post(newCustomer: CustomerModel) {
        this.costumers.push(newCustomer);
        this.api.save(this.costumers);

        return newCustomer;
    }
}
