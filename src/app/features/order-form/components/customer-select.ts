import { CustomerApi, CustomerModel } from '@/core/services/customer-api';
import { Component, forwardRef, input } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { NewCustomerDialog } from './new-customer-dialog';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
    selector: 'app-customer-select',
    imports: [
        FormsModule,
        SelectModule,
        ButtonModule,
        NewCustomerDialog,
        FloatLabel
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomerSelect),
            multi: true
        }
    ],
    template: `
        <p-floatlabel variant="on">
            <p-select
                [options]="customers"
                optionLabel="fullName"
                [ngModel]="value"
                (ngModelChange)="onSelect($event)"
                class="customer-select"
                id="customer_select"
                [invalid]="!!invalid()"
            >
                <ng-template #footer>
                    <div class="p-3">
                        <p-button
                            (onClick)="openNewCustomerDialog()"
                            label="Создать нового"
                            severity="secondary"
                            text
                            size="small"
                            icon="pi pi-plus"
                        />
                    </div>
                </ng-template>
            </p-select>
            <label for="customer_select">Покупатель</label>
        </p-floatlabel>
        <app-new-customer-dialog
            (onSave)="selectNewCustomer($event)"
            (onCancel)="closeNewCustomerDialog()"
            [visible]="newCustomerDialogVisible"
        ></app-new-customer-dialog>
    `,
    styles: `
        .customer-select {
            width: 180px;
        }
    `
})
export class CustomerSelect {
    initValue = input<string>();
    invalid = input<boolean | undefined>(false);
    customers: CustomerModel[] = [];
    value: CustomerModel | null = null;

    newCustomerDialogVisible = false;

    private onChange = (_: any) => {};
    private onTouched = () => {};

    constructor(private customerApi: CustomerApi) {}

    ngOnInit() {
        this.customers = this.customerApi.get();

        const initCustomerId = this.initValue();
        const initCustomer = this.customers.find(
            ({ id }) => id === initCustomerId
        );

        if (initCustomer) {
            this.onSelect(initCustomer);
        }
    }

    writeValue(customerId: string | null): void {
        if (!customerId) {
            this.value = null;
            return;
        }

        this.value = this.customers.find((c) => c.id === customerId) ?? null;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onSelect(customer: CustomerModel) {
        this.value = customer;
        this.onChange(customer.id);
        this.onTouched();
    }

    openNewCustomerDialog() {
        this.newCustomerDialogVisible = true;
    }

    closeNewCustomerDialog() {
        this.newCustomerDialogVisible = false;
    }

    selectNewCustomer(customer: CustomerModel) {
        this.customerApi.post(customer);
        this.customers = [...this.customers, customer];
        this.onSelect(customer);
        this.closeNewCustomerDialog();
    }
}
