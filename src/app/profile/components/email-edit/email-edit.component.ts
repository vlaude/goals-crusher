import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenEmailValidator } from '../../../shared/directives/forbidden-email.directive';

@Component({
  selector: 'vl-email-edit',
  templateUrl: './email-edit.component.html',
  styleUrls: ['./email-edit.component.scss'],
})
export class EmailEditComponent implements OnInit, OnChanges {
  @Input() user: UserModel;
  @Output() formSubmitted = new EventEmitter<FormGroup>();

  form: FormGroup;

  get emailFormControl(): AbstractControl {
    return this.form.controls.email;
  }

  constructor(private readonly fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user.currentValue !== changes.user.previousValue) {
      this.buildForm();
    }
  }

  async submit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    this.formSubmitted.emit(this.form);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email, forbiddenEmailValidator(this.user?.email)]],
    });
  }
}
