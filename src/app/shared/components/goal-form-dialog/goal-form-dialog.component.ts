import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vl-goal-form-dialog',
  templateUrl: './goal-form-dialog.component.html',
  styleUrls: ['./goal-form-dialog.component.scss'],
})
export class GoalFormDialogComponent implements OnInit {
  public form: FormGroup;

  get titleFormControl(): AbstractControl {
    return this.form.controls.title;
  }

  get descriptionFormControl(): AbstractControl {
    return this.form.controls.description;
  }

  constructor(private readonly fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', Validators.maxLength(250)],
      type: [data.defaultGoalType || 'daily', Validators.required],
    });
  }

  ngOnInit(): void {}
}
