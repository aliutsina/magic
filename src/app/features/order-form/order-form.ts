import {
    OrderAddressModel,
    OrderIngredientModel,
    OrderModel
} from '@/core/services/order-api';
import { Component, input, output } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    ReactiveFormsModule,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CustomerSelect } from './components/customer-select';
import { IngredientModel } from '@/core/services/ingredients-api';
import { Address } from './components/address';
import { IngredientsTable } from './components/ingredients-table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DELIVERY_METHODS, PAYMENT_METHODS } from './constants';

function minIngredients(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as OrderIngredientModel[] | null;

        if (!value) return { minIngredients: true };

        const validItems = value.filter((i) => i.id);
        return validItems.length >= min ? null : { minIngredients: true };
    };
}
interface Option {
    name: string;
    value: string;
}

@Component({
    selector: 'app-order-form',
    imports: [
        ReactiveFormsModule,
        DatePickerModule,
        InputTextModule,
        ButtonModule,
        FloatLabel,
        InputNumber,
        CustomerSelect,
        TableModule,
        Address,
        IngredientsTable,
        RadioButtonModule
    ],
    templateUrl: './order-form.html',
    styleUrl: './order-form.scss'
})
export class OrderForm {
    order = input.required<OrderModel>();
    onSave = output<OrderModel>();

    form!: FormGroup;
    formSubmitted = false;

    maxCreateAt: Date | undefined;
    minDueDate: Date | undefined;
    dateFormat = 'dd.mm.yy';
    deliveryMethods: Option[] | undefined;
    paymentMethods: Option[] | undefined;

    constructor(private fb: FormBuilder) {
        const today = new Date();
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        this.maxCreateAt = today;
        this.minDueDate = startOfToday;
        this.deliveryMethods = DELIVERY_METHODS;
        this.paymentMethods = PAYMENT_METHODS;
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        const {
            id,
            customerId,
            createAt,
            dueDate,
            deliveryMethod,
            paymentMethod,
            ingredients,
            address
        } = this.order();

        this.form = this.fb.group({
            id: [id, Validators.required],
            customerId: [customerId, Validators.required],
            createAt: [new Date(createAt), Validators.required],
            dueDate: [new Date(dueDate), Validators.required],
            deliveryMethod: [deliveryMethod, Validators.required],
            paymentMethod: [paymentMethod, Validators.required],
            ingredients: this.fb.control<OrderIngredientModel[]>(
                ingredients,
                minIngredients(3)
            ),
            address: this.fb.control<OrderAddressModel | null>(address)
        });
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.form.valid) {
            const value = this.form.value;
            const total = (value.ingredients as OrderIngredientModel[]).reduce(
                (result, ingredient) => result + ingredient.total,
                0
            );
            this.onSave.emit({
                ...value,
                total
            });

            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
