import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vl-weekly-goal-form',
  templateUrl: './weekly-goal-form.component.html',
  styleUrls: ['./weekly-goal-form.component.scss'],
})
export class WeeklyGoalFormComponent implements OnInit {
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = data.form;
  }

  ngOnInit(): void {}
}
