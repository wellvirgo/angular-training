import { Routes } from '@angular/router';
import { TestFormAddition } from './test-form-addition/test-form-addition';


export default [
    { path: 'combobox', loadComponent: () => import('./test-combobox/test-combobox').then(m => m.TestCombobox) },
    {
        path: 'form',
        loadComponent: () => import('./test-form/test-form').then(m => m.TestForm),
        children: [
            {
                path: 'addition',
                component: TestFormAddition,
            },
            {
                path: 'test-addition',
                outlet: 'addition',
                component: TestFormAddition,
            }
        ]
    },
] satisfies Routes;