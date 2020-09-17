import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './core/home/home.component';
import { DailyGoalsComponent } from './daily-goals/daily-goals.component';
import { WeeklyGoalsContainerComponent } from './weekly-goals/weekly-goals-container.component';
import { LifelongGoalsComponent } from './lifelong-goals/lifelong-goals.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { StateInitializedResolver } from './core/resolvers/state-initialized.resolver';
import { ProfileContainerComponent } from './profile/profile-container/profile-container.component';

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
    resolve: {
      StateInitializedResolver,
    },
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
        component: WeeklyGoalsContainerComponent,
      },
      {
        path: 'lifelong',
        component: LifelongGoalsComponent,
      },
      {
        path: 'profile',
        component: ProfileContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
