import { Component, OnInit } from '@angular/core';
import { GoalsFacade } from '../../../facades/goals.facade';
import { ActivatedRoute } from '@angular/router';
import { GoalType } from '../../../core/models/goal.type';
import { GoalModel } from '../../../core/models/goal.model';
import { FormGroup } from '@angular/forms';
import { GoalService } from '../../../core/services/goal.service';
import { ModalService } from '../../../core/services/modal.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vl-goals-type-container',
  templateUrl: './goals-type-container.component.html',
  styleUrls: ['./goals-type-container.component.scss'],
})
export class GoalsTypeContainerComponent implements OnInit {
  goalType: GoalType = this.route.snapshot.data.type || 'daily';
  goals$: Observable<GoalModel<any>[]> = this.goalsFacade.getGoalsWithCurrentAchievements$(this.goalType);
  achievedGoalsCount$: Observable<number> = this.goals$.pipe(
    map((goals) => goals.filter((goal) => goal.achieved).length)
  );
  goalsCount$: Observable<number> = this.goals$.pipe(map((goals) => goals.length));

  goalSelected: GoalModel<any>;
  /**
   * Hours left to achieve the goals according to the goals type.
   */
  hoursLeft: number;

  constructor(
    private readonly goalService: GoalService,
    private readonly goalsFacade: GoalsFacade,
    private readonly modalService: ModalService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.goalType = this.route.snapshot.data.type || 'daily';
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
    this.openModal('goal-detail-modal-' + this.goalType);
  }

  handleGoalDetailDeleteClicked(): void {
    this.closeModal('goal-detail-modal-' + this.goalType);
    this.openModal('goal-deletion-confirm-modal');
  }

  handleGoalDetailEditClicked(): void {
    this.closeModal('goal-detail-modal-' + this.goalType);
    this.openModal('goal-form-modal-' + this.goalType);
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
    this.closeModal('goal-form-modal-' + this.goalType);
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
