import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vl-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit, OnChanges {
  @Input() user: UserModel;
  @Output() formSubmitted = new EventEmitter<FormGroup>();
  @Output() cancelBtnClicked = new EventEmitter<void>();

  form: FormGroup;

  get emailFormControl(): AbstractControl {
    return this.form.controls.email;
  }

  get phoneFormControl(): AbstractControl {
    return this.form.controls.phone;
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

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.formSubmitted.emit(this.form);
  }

  cancel(): void {
    this.cancelBtnClicked.emit();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phoneNumber || '', [Validators.pattern('[- +()0-9]{6,}')]],
    });
  }
}
