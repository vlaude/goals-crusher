import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { GoalDetailDialogComponent } from './components/goal-detail-dialog/goal-detail-dialog.component';
import { GoalFormDialogComponent } from './components/goal-form-dialog/goal-form-dialog.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeLeftPipe } from './pipes/time-left.pipe';

@NgModule({
  declarations: [GoalListComponent, GoalDetailDialogComponent, GoalFormDialogComponent, TimeLeftPipe],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [GoalListComponent, TimeLeftPipe],
})
export class SharedModule {}
