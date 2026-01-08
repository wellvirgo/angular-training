import { Routes } from '@angular/router';
import { ComponentDashboard } from './features/component/component-dashboard/component-dashboard';
import { ComponentAdd } from './features/component/component-add/component-add';

export const routes: Routes = [
    { path: '', redirectTo: 'components', pathMatch: 'full' },
    { path: 'components', component: ComponentDashboard },
    { path: 'components/add', component: ComponentAdd }
];
