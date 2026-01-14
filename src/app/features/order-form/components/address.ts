import { OrderAddressModel } from '@/core/services/order-api';
import { Component, forwardRef, input } from '@angular/core';
import {
    ReactiveFormsModule,
    NG_VALUE_ACCESSOR,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-address',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        InputNumber,
        FloatLabelModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Address),
            multi: true
        }
    ],
    template: `
        <form [formGroup]="form">
            <div class="address-row flex items-center flex-start gap-4 ">
                <p-floatlabel variant="on">
                    <input
                        pInputText
                        id="address_country"
                        formControlName="country"
                        class="address-input-md"
                        [invalid]="isInvalid('country')"
                    />
                    <label for="address_country">Старна</label>
                </p-floatlabel>
                <p-floatlabel variant="on">
                    <input
                        pInputText
                        id="address_city"
                        formControlName="city"
                        class="address-input-md"
                        [invalid]="isInvalid('city')"
                    />
                    <label for="address_city">Город</label>
                </p-floatlabel>
                <p-floatlabel variant="on">
                    <input
                        pInputText
                        id="address_zip"
                        formControlName="zip"
                        class="address-input-md"
                        [invalid]="isInvalid('zip')"
                    />
                    <label for="address_zip">Почтовый индекс</label>
                </p-floatlabel>
            </div>
            <div class="address-row flex items-center flex-start gap-4 pt-4">
                <p-floatlabel variant="on">
                    <input
                        pInputText
                        id="address_street"
                        formControlName="street"
                        class="address-input"
                        [invalid]="isInvalid('street')"
                    />
                    <label for="address_street">Улица</label>
                </p-floatlabel>
                <p-floatlabel variant="on" class="address-floatlabel">
                    <p-inputnumber
                        fluid="true"
                        id="address_house"
                        formControlName="house"
                        class="address-input-sm"
                        [invalid]="isInvalid('house')"
                    />
                    <label for="address_house">Дом</label>
                </p-floatlabel>
                <p-floatlabel variant="on" class="address-floatlabel">
                    <p-inputnumber
                        fluid="true"
                        id="address_building"
                        formControlName="building"
                        class="address-input-sm"
                        [invalid]="isInvalid('building')"
                    />
                    <label for="address_building">Корпус</label>
                </p-floatlabel>
                <p-floatlabel variant="on" class="address-floatlabel">
                    <p-inputnumber
                        fluid="true"
                        id="address_flat"
                        formControlName="flat"
                        class="address-input-sm"
                        [invalid]="isInvalid('flat')"
                    />
                    <label for="address_flat">Квартира</label>
                </p-floatlabel>
            </div>
        </form>
    `,
    styles: `
        .address {
            &-input {
                width: 320px;

                @media (max-width: 720px) {
                    width: 100%;
                }
            }

            &-input-md {
                width: 210px;

                @media (max-width: 720px) {
                    width: 100%;
                }
            }

            &-input-sm {
                width: 98px;

                @media (max-width: 720px) {
                    width: 100%;
                }
            }

            &-floatlabel {
                width: auto !important;
            }

            &-row {
                @media (max-width: 720px) {
                    flex-wrap: wrap;
                    justify-content: flex-start;
                }
            }
        }
    `
})
export class Address {
    formSubmitted = input(false);
    form!: FormGroup;

    private onChange = (_: any) => {};
    private onTouched = () => {};

    constructor(private fb: FormBuilder) {}

    writeValue(value: OrderAddressModel | null): void {
        const {
            country = '',
            city = '',
            zip = '',
            street = '',
            house = '',
            building = '',
            flat = ''
        } = value ?? {};

        this.form = this.fb.group({
            country: [country, Validators.required],
            city: [city, Validators.required],
            zip: [zip, Validators.required],
            street: [street, Validators.required],
            house: [house, Validators.required],
            building: [building],
            flat: [flat]
        });

        this.form.valueChanges.subscribe((val) => {
            this.onChange(val);
            this.onTouched();
        });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted());
    }
}
