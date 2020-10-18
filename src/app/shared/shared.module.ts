import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { GoalDetailDialogComponent } from './components/goal-detail-dialog/goal-detail-dialog.component';
import { GoalFormDialogComponent } from './components/goal-form-dialog/goal-form-dialog.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeLeftPipe } from './pipes/time-left.pipe';
import { AchieveGoalDialogComponent } from './components/achieve-goal-dialog/achieve-goal-dialog.component';
import { UnachieveGoalDialogComponent } from './components/unachieve-goal-dialog/unachieve-goal-dialog.component';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { CardComponent } from './components/card/card.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [
    GoalListComponent,
    GoalDetailDialogComponent,
    GoalFormDialogComponent,
    TimeLeftPipe,
    AchieveGoalDialogComponent,
    UnachieveGoalDialogComponent,
    ModalComponent,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    FormFieldComponent,
    RadioButtonComponent,
    CardComponent,
    SelectComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    GoalListComponent,
    TimeLeftPipe,
    ModalComponent,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    FormFieldComponent,
    RadioButtonComponent,
    CardComponent,
    SelectComponent,
  ],
})
export class SharedModule {}
