import { Component, OnInit } from '@angular/core';
import { GoalsFacade } from '../../../facades/goals.facade';
import { ActivatedRoute } from '@angular/router';
import { GoalType } from '../../../core/models/goal.type';
import { GoalModel } from '../../../core/models/goal.model';
import { FormGroup } from '@angular/forms';
import { GoalService } from '../../../core/services/goal.service';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'vl-goals-type-container',
  templateUrl: './goals-type-container.component.html',
  styleUrls: ['./goals-type-container.component.scss'],
})
export class GoalsTypeContainerComponent implements OnInit {
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
    private readonly modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.goalType = this.route.snapshot.data.type || 'daily';
    this.goalsFacade.getGoalsWithCurrentAchievements$(this.goalType).subscribe((goals) => {
      this.goals = goals;
    });
    this.hoursLeft = this.goalService.getHoursLeftToAchieve(this.goalType);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  handleGoalAchieveBoxClicked(goal: GoalModel<any>): void {
    if (!goal.achieved) {
      this.goalsFacade.achieveGoal(goal);
    } else {
      this.goalsFacade.unAchieveGoal(goal);
    }
  }

  handleGoalClicked(goal: GoalModel<any>): void {
    this.goalSelected = goal;
    this.openModal('goal-detail-modal');
  }

  handleGoalDetailDeleteClicked(): void {
    this.closeModal('goal-detail-modal');
    this.openModal('goal-deletion-confirm-modal');
  }

  handleGoalDetailEditClicked(): void {
    this.closeModal('goal-detail-modal');
    this.openModal('goal-form-modal');
  }

  handleGoalFormSubmitted(form: FormGroup): void {
    if (!form.valid) {
      return;
    }
    if (form.value.id) {
      this.goalsFacade.updateGoal(form.value);
    } else {
      this.goalsFacade.addGoal(form.value);
    }
    this.closeModal('goal-form-modal');
  }

  onCancelDeleteGoal(): void {
    this.closeModal('goal-deletion-confirm-modal');
  }

  onConfirmDeleteGoal(): void {
    this.closeModal('goal-deletion-confirm-modal');
    this.goalsFacade.removeGoal(this.goalSelected);
    this.goalSelected = null;
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }
}
