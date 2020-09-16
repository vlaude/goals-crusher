import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './core/home/home.component';
import { DailyGoalsComponent } from './daily-goals/daily-goals.component';
import { WeeklyGoalsContainerComponent } from './weekly-goals/weekly-goals-container.component';
import { LifelongGoalsComponent } from './lifelong-goals/lifelong-goals.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'weekly', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
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
        data: {
          title: 'Daily Goals',
        },
      },
      {
        path: 'weekly',
        component: WeeklyGoalsContainerComponent,
        data: {
          title: 'Weekly Goals',
        },
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
