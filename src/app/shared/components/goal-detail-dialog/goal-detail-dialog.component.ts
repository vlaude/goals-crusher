import { Component, Inject, OnInit } from '@angular/core';
import { GoalModel } from '../../../core/models/goal.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export type GoalDetailDialogAction = 'remove' | 'edit';

@Component({
  selector: 'vl-goal-detail',
  templateUrl: './goal-detail-dialog.component.html',
  styleUrls: ['./goal-detail-dialog.component.scss'],
})
export class GoalDetailDialogComponent implements OnInit {
  goal: GoalModel<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.goal = data.goal || data;
  }

  ngOnInit(): void {}
}
