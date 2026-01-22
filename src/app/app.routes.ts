import { Routes } from '@angular/router';
import { authGuard } from './core/service/auth/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'components', pathMatch: 'full' },
    {
        path: 'components',
        title: 'Components Dashboard',
        loadComponent: () => import('./features/component/component-dashboard/component-dashboard').then(m => m.ComponentDashboard),
        canActivate: [authGuard]
    },
    {
        path: 'components/add',
        title: 'Add Component',
        loadComponent: () => import('./features/component/component-add/component-add').then(m => m.ComponentAdd),
        canActivate: [authGuard]
    },
    {
        path: 'components/update/:id',
        title: 'Update Component',
        loadComponent: () => import('./features/component/component-update/component-update').then(m => m.ComponentUpdate),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./features/auth/auth-login/auth-login').then(m => m.AuthLogin)
    },
    {
        path: 'test',
        loadChildren: () => import('./features/test/test.route')
    }
];
