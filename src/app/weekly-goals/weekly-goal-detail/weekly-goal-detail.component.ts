import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoalModel } from '../../core/models/goal.model';

export type GoalDetailAction = 'remove' | 'edit';

@Component({
  selector: 'vl-weekly-goal-detail',
  templateUrl: './weekly-goal-detail.component.html',
  styleUrls: ['./weekly-goal-detail.component.scss'],
})
export class WeeklyGoalDetailComponent implements OnInit {
  goal: GoalModel<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.goal = data.goal;
  }

  ngOnInit(): void {}
}
