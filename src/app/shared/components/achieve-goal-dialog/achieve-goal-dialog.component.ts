import { Component, Inject, OnInit } from '@angular/core';
import { GoalModel } from '../../../core/models/goal.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vl-achieve-goal-dialog',
  templateUrl: './achieve-goal-dialog.component.html',
  styleUrls: ['./achieve-goal-dialog.component.scss'],
})
export class AchieveGoalDialogComponent implements OnInit {
  public goal: GoalModel<any>;
  public date: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.goal = data.goal;
    this.date = data.date;
  }

  ngOnInit(): void {}
}
