// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './pages/not-found.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  
  
  {path: 'tasks', component : TaskListComponent},

  {path: 'tasks/add', component : TaskFormComponent},

  { path : 'tasks/edit/:id', component: TaskFormComponent},

  {path:'login', component: LoginComponent},

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'register', component: RegisterComponent },
  
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  }, 
  { path : '**', redirectTo: '/tasks'},
];
