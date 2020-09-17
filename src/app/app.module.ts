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
import { WeeklyGoalsContainerComponent } from './weekly-goals/weekly-goals-container.component';
import { DailyGoalsComponent } from './daily-goals/daily-goals.component';
import { LifelongGoalsComponent } from './lifelong-goals/lifelong-goals.component';
import { WeeklyGoalListComponent } from './weekly-goals/weekly-goal-list/weekly-goal-list.component';
import { WeeklyGoalCardComponent } from './weekly-goals/weekly-goal-card/weekly-goal-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WeeklyGoalFormComponent } from './weekly-goals/weekly-goal-form/weekly-goal-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WeeklyGoalDetailComponent } from './weekly-goals/weekly-goal-detail/weekly-goal-detail.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ProfileContainerComponent } from './profile/profile-container/profile-container.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WeeklyGoalsContainerComponent,
    DailyGoalsComponent,
    LifelongGoalsComponent,
    WeeklyGoalListComponent,
    WeeklyGoalCardComponent,
    WeeklyGoalFormComponent,
    WeeklyGoalDetailComponent,
    ProfileContainerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
