import { BrowserModule } from '@angular/platform-browser';
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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ProfileContainerComponent } from './profile/profile-container/profile-container.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';
import { GoalsContainerComponent } from './goals/goals-container.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CalendarsContainerComponent } from './calendars/calendars-container.component';
import { CalendarComponent } from './calendars/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileContainerComponent,
    GoalsContainerComponent,
    CalendarsContainerComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
