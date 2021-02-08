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
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from './shared/shared.module';
import { GoalsTypeContainerComponent } from './goals/containers/goals-type-container/goals-type-container.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CalendarsContainerComponent } from './calendars/containers/calendars-container/calendars-container.component';
import { CalendarComponent } from './calendars/components/calendar/calendar.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { GoalsTabsContainerComponent } from './goals/containers/goals-tabs-container/goals-tabs-container.component';
import { GoalDetailComponent } from './goals/components/goal-detail/goal-detail.component';
import { GoalFormComponent } from './goals/components/goal-form/goal-form.component';
import { SettingsComponent } from './settings/settings.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { SendResetPasswordRequestModalComponent } from './auth/send-reset-password-request-modal/send-reset-password-request-modal.component';
import { GoalListComponent } from './goals/components/goal-list/goal-list.component';
import { AvatarEditComponent } from './profile/components/avatar-edit/avatar-edit.component';
import { EmailEditComponent } from './profile/components/email-edit/email-edit.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  } as any;
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    GoalsTypeContainerComponent,
    CalendarsContainerComponent,
    CalendarComponent,
    GoalsTabsContainerComponent,
    GoalListComponent,
    GoalDetailComponent,
    GoalFormComponent,
    SettingsComponent,
    SendResetPasswordRequestModalComponent,
    EmailEditComponent,
    AvatarEditComponent,
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
