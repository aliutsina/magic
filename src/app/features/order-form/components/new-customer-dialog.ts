import { CustomerModel } from '@/core/services/customer-api';
import { Component, Input, output } from '@angular/core';
import {
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { v4 } from 'uuid';
@Component({
    selector: 'app-new-customer-dialog',
    imports: [
        ReactiveFormsModule,
        Dialog,
        InputTextModule,
        ButtonModule,
        FloatLabel
    ],
    template: `
        <p-dialog header="Новый покупатель" [visible]="visible" [modal]="true">
            <form [formGroup]="form" class="new-customer-form">
                <div class="new-customer-fields">
                    <p-floatlabel variant="on" class="new-customer-field-label">
                        <input
                            id="customer_first_name"
                            pInputText
                            formControlName="fullName"
                            class="new-customer-input-lg"
                        />
                        <label for="customer_first_name">Имя Фамилия</label>
                    </p-floatlabel>

                    <p-floatlabel
                        variant="on"
                        class="new-customer-field-label-sm"
                    >
                        <input
                            pInputText
                            type="customer_email"
                            inputId="customer_email"
                            formControlName="email"
                            class="new-customer-input"
                        />
                        <label for="customer_email">Email</label>
                    </p-floatlabel>
                    <p-floatlabel
                        variant="on"
                        class="new-customer-field-label-sm"
                    >
                        <input
                            pInputText
                            inputId="customer_phone"
                            formControlName="phone"
                            class="new-customer-input"
                        />
                        <label for="customer_phone">Номер телефона</label>
                    </p-floatlabel>
                </div>
                <div class="new-customer-buttons">
                    <p-button
                        (onClick)="save()"
                        type="submit"
                        label="Сохранить"
                    />
                    <p-button
                        (onClick)="cancel()"
                        severity="secondary"
                        label="Отменить"
                    />
                </div>
            </form>
        </p-dialog>
    `,
    styles: `
        .new-customer {
            &-form {
                width: 380px;
                max-width: 100%;
            }

            &-fields {
                padding-top: 0.5rem;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 1rem;
                flex-wrap: wrap;

                input {
                    width: 100%;
                }
            }
            &-field-label {
                width: 100%;
            }
            &-field-label-sm {
                max-width: 100%;
                width: 180px;
            }

            &-buttons {
                padding-top: 1rem;
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                gap: 1rem;
            }
        }
    `
})
export class NewCustomerDialog {
    @Input() visible!: boolean;
    onSave = output<CustomerModel>();
    onCancel = output();

    form: FormGroup;

    formSubmitted = false;
    dialogVisible = false;
    showAddressForm = false;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            fullName: ['', Validators.required],
            phone: []
        });
    }

    showDialog() {
        this.dialogVisible = true;
    }
    save() {
        this.formSubmitted = true;

        if (!this.form.valid) {
            return;
        }

        const { email, fullName, phone } = this.form.value;
        const newCustomer: CustomerModel = {
            id: v4(),
            email,
            fullName,
            phone
        };

        this.onSave.emit(newCustomer);
        this.form.reset();
        this.formSubmitted = false;
    }
    cancel() {
        this.onCancel.emit();
    }

    isInvalid(controlName: string) {
        const control = this.form.get(controlName);

        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
