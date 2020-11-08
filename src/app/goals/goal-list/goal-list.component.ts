import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoalModel } from '../../core/models/goal.model';

@Component({
  selector: 'vl-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss'],
})
export class GoalListComponent implements OnInit {
  @Input() goals: GoalModel<any>[];
  @Output() goalAchieveBoxClicked = new EventEmitter<GoalModel<any>>();
  @Output() goalClicked = new EventEmitter<GoalModel<any>>();

  constructor() {}

  ngOnInit(): void {}
}
