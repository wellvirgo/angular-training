import { Routes } from '@angular/router';


export default [
    { path: 'combobox', loadComponent: () => import('./test-combobox/test-combobox').then(m => m.TestCombobox) },
    {
        path: 'form',
        loadComponent: () => import('./test-form/test-form').then(m => m.TestForm),
        children: [
            {
                path: 'addition',
                loadComponent: () => import('./test-form-addition/test-form-addition').then(m => m.TestFormAddition),
            },
        ]
    },
] satisfies Routes;