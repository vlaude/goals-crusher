import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './core/home/home.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { StateInitializedResolver } from './core/resolvers/state-initialized.resolver';
import { ProfileContainerComponent } from './profile/profile-container/profile-container.component';
import { GoalsContainerComponent } from './goals/goals-container.component';
import { CalendarsContainerComponent } from './calendars/calendars-container.component';
import { GoalsTabsComponent } from './goals/goals-tabs/goals-tabs.component';
import { SettingsComponent } from './settings/settings.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
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
        path: 'goals',
        component: GoalsTabsComponent,
        children: [
          {
            path: '',
            redirectTo: 'daily',
            pathMatch: 'full',
          },
          {
            path: 'daily',
            component: GoalsContainerComponent,
            data: { type: 'daily', title: 'Daily Goals', animation: 'DailyTab' },
          },
          {
            path: 'weekly',
            component: GoalsContainerComponent,
            data: { type: 'weekly', title: 'Weekly Goals', animation: 'WeeklyTab' },
          },
          {
            path: 'lifelong',
            component: GoalsContainerComponent,
            data: { type: 'lifelong', title: 'Lifelong Goals', animation: 'LifelongTab' },
          },
        ],
      },
      {
        path: 'calendar',
        component: CalendarsContainerComponent,
      },
      {
        path: 'profile',
        component: ProfileContainerComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
