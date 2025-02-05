import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';

export const AppRoutes: Routes = [
    { path: '', component: LoginComponent }
];

export const ROUTING: ModuleWithProviders<any> = RouterModule.forRoot(AppRoutes);
