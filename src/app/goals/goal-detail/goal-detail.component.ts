import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GoalModel } from '../../core/models/goal.model';

@Component({
  selector: 'vl-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.scss'],
})
export class GoalDetailComponent implements OnInit {
  @Input() goal: GoalModel<any>;
  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
