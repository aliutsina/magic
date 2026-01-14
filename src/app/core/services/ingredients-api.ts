import { Injectable } from '@angular/core';

export interface IngredientModel {
    id: string;
    name: string;
    price: number;
}

const MOCK: IngredientModel[] = [
    { id: 'ing-01', name: 'Корень мандрагоры', price: 15 },
    { id: 'ing-02', name: 'Пыльца лунного цветка', price: 22 },
    { id: 'ing-03', name: 'Слеза феникса', price: 120 },
    { id: 'ing-04', name: 'Чешуя дракона', price: 200 },
    { id: 'ing-05', name: 'Яд болотной жабы', price: 18 },
    { id: 'ing-06', name: 'Перо ворона', price: 9 },
    { id: 'ing-07', name: 'Пепел древнего свитка', price: 35 },
    { id: 'ing-08', name: 'Кристалл эфира', price: 80 },
    { id: 'ing-09', name: 'Кровь саламандры', price: 55 },
    { id: 'ing-10', name: 'Мох с надгробий', price: 12 },
    { id: 'ing-11', name: 'Сердце ночной лилии', price: 27 },
    { id: 'ing-12', name: 'Роса рассвета', price: 7 },
    { id: 'ing-13', name: 'Кость призрака', price: 60 },
    { id: 'ing-14', name: 'Семя пустотного дерева', price: 95 },
    { id: 'ing-15', name: 'Чернильная эссенция осьминога', price: 25 },
    { id: 'ing-16', name: 'Звёздная пыль', price: 150 },
    { id: 'ing-17', name: 'Жало теневого скорпиона', price: 40 },
    { id: 'ing-18', name: 'Мёд диких фей', price: 30 },
    { id: 'ing-19', name: 'Осколок обсидиана', price: 20 },
    { id: 'ing-20', name: 'Шёпот духа ветра', price: 110 }
];

@Injectable({
    providedIn: 'root'
})
export class IngredientsApi {
    ingredients = MOCK;

    get(): IngredientModel[] {
        return this.ingredients;
    }
}
