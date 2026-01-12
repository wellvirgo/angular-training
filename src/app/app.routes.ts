import { Routes } from '@angular/router';
import { ComponentDashboard } from './features/component/component-dashboard/component-dashboard';
import { ComponentAdd } from './features/component/component-add/component-add';
import { ComponentUpdate } from './features/component/component-update/component-update';
import { AuthLogin } from './features/auth/auth-login/auth-login';
import { authGuard } from './core/service/auth/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'components', pathMatch: 'full' },
    { path: 'components', component: ComponentDashboard, canActivate: [authGuard] },
    { path: 'components/add', component: ComponentAdd, canActivate: [authGuard] },
    { path: 'components/update/:id', component: ComponentUpdate, canActivate: [authGuard] },
    { path: 'login', component: AuthLogin }
];
