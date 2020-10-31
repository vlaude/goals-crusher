import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ProfileContainerComponent } from './profile/profile-container/profile-container.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';
import { GoalsContainerComponent } from './goals/goals-container.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CalendarsContainerComponent } from './calendars/calendars-container.component';
import { CalendarComponent } from './calendars/calendar/calendar.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { GoalsTabsComponent } from './goals/goals-tabs/goals-tabs.component';
import { GoalDetailComponent } from './goals/goal-detail/goal-detail.component';
import { GoalFormComponent } from './goals/goal-form/goal-form.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileContainerComponent,
    GoalsContainerComponent,
    CalendarsContainerComponent,
    CalendarComponent,
    GoalsTabsComponent,
    GoalDetailComponent,
    GoalFormComponent,
  ],
  imports: [
    BrowserModule,
    HammerModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
