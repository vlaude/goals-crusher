import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from './core/core.module';
import { WeeklyGoalsComponent } from './weekly-goals/weekly-goals.component';
import { DailyGoalsComponent } from './daily-goals/daily-goals.component';
import { LifelongGoalsComponent } from './lifelong-goals/lifelong-goals.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, WeeklyGoalsComponent, DailyGoalsComponent, LifelongGoalsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
