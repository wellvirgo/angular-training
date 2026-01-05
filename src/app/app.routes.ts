import { Routes } from '@angular/router';
import { ComponentDashboard } from './features/component/component-dashboard/component-dashboard';

export const routes: Routes = [
    { path: '', redirectTo: 'components', pathMatch: 'full' },
    { path: 'components', component: ComponentDashboard }
];
