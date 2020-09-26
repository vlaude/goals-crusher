import { Component, Inject, OnInit } from '@angular/core';
import { GoalModel } from '../../../core/models/goal.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vl-unachieve-goal-dialog',
  templateUrl: './unachieve-goal-dialog.component.html',
  styleUrls: ['./unachieve-goal-dialog.component.scss'],
})
export class UnachieveGoalDialogComponent implements OnInit {
  public goal: GoalModel<any>;
  public date: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.goal = data.goal;
    this.date = data.date;
  }

  ngOnInit(): void {}
}
