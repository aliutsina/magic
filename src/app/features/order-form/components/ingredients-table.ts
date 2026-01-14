import {
    IngredientModel,
    IngredientsApi
} from '@/core/services/ingredients-api';
import { OrderIngredientModel } from '@/core/services/order-api';
import { Component, forwardRef, input, output } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    FormArray,
    ReactiveFormsModule,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-ingredients-table',
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        Select,
        InputNumber,
        TableModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IngredientsTable),
            multi: true
        }
    ],
    template: `@if (form) {
        <p-table [value]="form.controls">
            <ng-template pTemplate="header">
                <tr>
                    <th>Ингредиент</th>
                    <th style="width: 8rem">Цена</th>
                    <th style="width: 8rem">Кол-во</th>
                    <th style="width: 8rem">Сумма</th>
                    <th style="width: 2rem"></th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-row let-i="rowIndex">
                <tr [formGroup]="row">
                    <td>
                        <p-select
                            appendTo="body"
                            formControlName="id"
                            [options]="ingredients"
                            optionLabel="name"
                            optionValue="id"
                            [overlayOptions]="{ style: { zIndex: 12000 } }"
                            placeholder="Выбрать"
                            (onChange)="onIngredientChange(i)"
                            fluid="true"
                        />
                    </td>

                    <td>
                        <p-inputnumber
                            formControlName="price"
                            [disabled]="true"
                            fluid="true"
                            class="ingredients-table-input"
                        />
                    </td>

                    <td>
                        <p-inputnumber
                            formControlName="quantity"
                            [min]="1"
                            fluid="true"
                            class="ingredients-table-input"
                        />
                    </td>

                    <td>
                        <p-inputnumber
                            formControlName="total"
                            [disabled]="true"
                            fluid="true"
                            class="ingredients-table-input"
                        />
                    </td>

                    <td style="width: 1rem">
                        @if (row.value.id) {
                            <p-button
                                icon="pi pi-trash"
                                [rounded]="true"
                                [text]="true"
                                severity="danger"
                                (click)="removeRow(i)"
                            />
                        }
                    </td>
                </tr>
            </ng-template>
            <ng-template #footer>
                <tr>
                    <td colspan="5">Сумма: {{ total }}</td>
                </tr>
            </ng-template>
        </p-table>
    } `,
    styles: `
        .ingredients-table {
            &-input {
                min-width: 84px;
            }
        }
    `
})
export class IngredientsTable {
    form!: FormArray;

    private onChange = (_: any) => {};
    private onTouched = () => {};

    ingredients: IngredientModel[] = [];

    constructor(
        private fb: FormBuilder,
        private ingredientsApi: IngredientsApi
    ) {}

    ngOnInit() {
        this.ingredients = this.ingredientsApi.get();
    }

    get total(): number {
        return this.form
            .getRawValue()
            .reduce((sum, ingredient) => sum + ingredient.total, 0);
    }

    createIngredientForm(value?: Partial<OrderIngredientModel>): FormGroup {
        const row = this.fb.group({
            id: [value?.id ?? null],
            price: [value?.price ?? 0],
            quantity: [value?.quantity ?? 1],
            total: [value?.total ?? 0]
        });

        this.listenQuantityChanges(row);

        return row;
    }

    addEmptyRow() {
        this.form.push(this.createIngredientForm());
    }

    onIngredientChange(index: number) {
        const row = this.form.at(index) as FormGroup;
        const ingredientId = row.get('id')?.value;

        const ingredient = this.ingredients.find((i) => i.id === ingredientId);
        if (!ingredient) return;

        row.patchValue({
            price: ingredient.price,
            quantity: 1,
            total: ingredient.price
        });

        this.listenQuantityChanges(row);

        if (index === this.form.length - 1) {
            this.addEmptyRow();
        }
    }

    listenQuantityChanges(row: FormGroup) {
        row.get('quantity')?.valueChanges.subscribe((quantity) => {
            const price = row.get('price')?.value || 0;
            row.get('total')?.setValue(price * quantity, { emitEvent: false });
        });
    }

    removeRow(index: number) {
        this.form.removeAt(index);

        if (this.form.length === 0) {
            this.addEmptyRow();
        }
    }

    writeValue(value: OrderIngredientModel[] | null): void {
        const rows = value?.length
            ? value.map((v) => this.createIngredientForm(v))
            : [this.createIngredientForm()];

        this.form = this.fb.array(rows);

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
}
