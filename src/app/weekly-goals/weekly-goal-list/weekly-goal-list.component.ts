import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoalModel } from '../../core/models/goal.model';

@Component({
  selector: 'vl-weekly-goal-list',
  templateUrl: './weekly-goal-list.component.html',
  styleUrls: ['./weekly-goal-list.component.scss'],
})
export class WeeklyGoalListComponent implements OnInit {
  @Input() weeklyGoals: GoalModel<'weekly'>[];
  @Output() goalClicked = new EventEmitter<GoalModel<any>>();
  @Output() goalDetailClicked = new EventEmitter<GoalModel<any>>();

  constructor() {}

  ngOnInit(): void {}
}
