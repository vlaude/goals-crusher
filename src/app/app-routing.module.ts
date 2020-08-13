import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './core/home/home.component';
import { DailyGoalsComponent } from './daily-goals/daily-goals.component';
import { WeeklyGoalsComponent } from './weekly-goals/weekly-goals.component';
import { LifelongGoalsComponent } from './lifelong-goals/lifelong-goals.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'daily',
        component: DailyGoalsComponent,
      },
      {
        path: 'weekly',
        component: WeeklyGoalsComponent,
      },
      {
        path: 'lifelong',
        component: LifelongGoalsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
