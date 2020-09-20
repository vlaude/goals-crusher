import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoalModel } from '../../../core/models/goal.model';

@Component({
  selector: 'vl-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss'],
})
export class GoalListComponent implements OnInit {
  @Input() goals: GoalModel<any>[];
  @Output() goalClicked = new EventEmitter<GoalModel<any>>();
  @Output() goalDetailClicked = new EventEmitter<GoalModel<any>>();

  timeoutHandler = null;

  constructor() {}

  ngOnInit(): void {}

  mousedown(goal: GoalModel<any>) {
    this.timeoutHandler = setTimeout(() => {
      this.timeoutHandler = null;
      this.goalClicked.emit(goal);
    }, 1000);
  }

  mouseup() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }
}
