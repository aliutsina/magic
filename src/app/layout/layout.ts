import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, RouterModule, Button],
    template: `<div class="app-layout-wrapper">
        <div class="app-layout-header">
            <div class="app-layout-header-actions">
                <p-button
                    icon="pi pi-home"
                    [rounded]="true"
                    size="large"
                    link="true"
                    routerLink="/orders/"
                />
            </div>
        </div>
        <div class="app-layout-content">
            <div class="app-layout-main"><router-outlet></router-outlet></div>

            <div class="app-layout-footer">
                Developed by Alevtina Yurevich, 2026
                <a
                    href="https://t.me/AlevtinaY"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary font-bold hover:underline"
                    >Telegram</a
                >
            </div>
        </div>
    </div> `,
    styleUrl: './layout.scss'
})
export class AppLayout {}
