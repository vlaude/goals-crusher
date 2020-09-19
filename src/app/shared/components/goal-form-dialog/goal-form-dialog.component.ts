import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vl-goal-form-dialog',
  templateUrl: './goal-form-dialog.component.html',
  styleUrls: ['./goal-form-dialog.component.scss'],
})
export class GoalFormDialogComponent implements OnInit {
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = data.form || data;
  }

  ngOnInit(): void {}
}
