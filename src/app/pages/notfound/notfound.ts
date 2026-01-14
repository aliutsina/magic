import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule, ButtonModule],
    template: ` <div
        class="flex flex-wrap items-center justify-center min-h-screen overflow-hidden"
    >
        <p class="w-full">Уппс, вы потерялись...</p>
        <p-button label="Вернуться на главную" routerLink="/" />
    </div>`
})
export class Notfound {}
