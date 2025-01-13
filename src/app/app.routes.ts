import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/task-list/task-list.component').then(m => m.TaskListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];