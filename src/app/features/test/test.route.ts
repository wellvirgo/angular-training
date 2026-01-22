import { Routes } from '@angular/router';


export default [
    { path: 'combobox', loadComponent: () => import('./test-combobox/test-combobox').then(m => m.TestCombobox) }
] satisfies Routes;