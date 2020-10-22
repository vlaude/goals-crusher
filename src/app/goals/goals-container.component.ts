import { Component, OnInit } from '@angular/core';
import { GoalsFacade } from '../facades/goals.facade';
import { ActivatedRoute } from '@angular/router';
import { GoalType } from '../core/models/goal.type';
import { GoalModel } from '../core/models/goal.model';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { GoalService } from '../core/services/goal.service';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'vl-goals-container',
  templateUrl: './goals-container.component.html',
  styleUrls: ['./goals-container.component.scss'],
})
export class GoalsContainerComponent implements OnInit {
  public goals: GoalModel<any>[];
  public goalSelected: GoalModel<any>;
  public goalType: GoalType;
  public hoursLeft: number;

  get achievedGoalsCount(): number {
    return this.goals.filter((goal) => goal.achieved).length;
  }

  constructor(
    private readonly goalsFacade: GoalsFacade,
    private readonly goalService: GoalService,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.goalType = this.route.snapshot.data.type || 'daily';
    this.goalsFacade.getGoalsByTypeWithCurrentAchievements$(this.goalType).subscribe((goals) => {
      this.goals = goals;
    });
    this.hoursLeft = this.goalService.getHoursLeftToAchieve(this.goalType);
  }

  public openModal(id: string) {
    this.modalService.open(id);
  }

  public closeModal(id: string) {
    this.modalService.close(id);
  }

  handleGoalAchieveBoxClicked(goal: GoalModel<any>) {
    if (!goal.achieved) {
      this.goalsFacade.achievedGoal(goal);
    } else {
      this.goalsFacade.unAchievedGoal(goal);
    }
  }

  handleGoalClicked(goal: GoalModel<any>) {
    this.goalSelected = goal;
    this.openModal('goal-detail-modal');
  }

  handleGoalDetailEditClicked() {
    this.closeModal('goal-detail-modal');
    this.openModal('goal-form-modal');
  }

  handleGoalDetailDeleteClicked() {
    this.closeModal('goal-detail-modal');
    this.openModal('goal-deletion-confirm-modal');
  }

  handleGoalFormSubmitted(form: FormGroup): void {
    if (!form.valid) return;
    if (form.value.id) {
      this.goalsFacade.updateGoal(form.value);
    } else {
      this.goalsFacade.addGoal(form.value);
    }
    this.closeModal('goal-form-modal');
  }

  onConfirmDeleteGoal(): void {
    this.closeModal('goal-deletion-confirm-modal');
    this.goalsFacade.removeGoal(this.goalSelected);
    this.goalSelected = null;
  }

  onCancelDeleteGoal(): void {
    this.closeModal('goal-deletion-confirm-modal');
  }
}
