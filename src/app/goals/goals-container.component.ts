import { Component, OnInit } from '@angular/core';
import { GoalsFacade } from '../facades/goals.facade';
import { ActivatedRoute } from '@angular/router';
import { GoalType } from '../core/models/goal.type';
import { GoalModel } from '../core/models/goal.model';
import { MatDialog } from '@angular/material/dialog';
import { GoalFormDialogComponent } from '../shared/components/goal-form-dialog/goal-form-dialog.component';
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

  private openModal(id: string) {
    this.modalService.open(id);
  }

  private closeModal(id: string) {
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

  handleGoalDetailDeleteClicked() {
    this.closeModal('goal-detail-modal');
    this.goalsFacade.removeGoal(this.goalSelected);
    this.goalSelected = null;
  }

  addGoal(form: FormGroup) {
    if (!form?.valid) {
      return;
    }
    this.goalsFacade.addGoal(form.value);
  }
}
