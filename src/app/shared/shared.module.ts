import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeLeftPipe } from './pipes/time-left.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { CardComponent } from './components/card/card.component';
import { SelectComponent } from './components/select/select.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [
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
    ConfirmModalComponent,
    SnackbarComponent,
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
    ConfirmModalComponent,
    SnackbarComponent,
  ],
})
export class SharedModule {}
