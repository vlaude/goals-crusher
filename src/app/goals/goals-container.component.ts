import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../core/services/sidenav.service';
import { GoalsFacade } from '../facades/goals.facade';
import { ActivatedRoute } from '@angular/router';
import { GoalType } from '../core/models/goal.type';
import { GoalModel } from '../core/models/goal.model';
import {
  GoalDetailDialogAction,
  GoalDetailDialogComponent,
} from '../shared/components/goal-detail-dialog/goal-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GoalFormDialogComponent } from '../shared/components/goal-form-dialog/goal-form-dialog.component';
import { FormGroup } from '@angular/forms';
import { GoalService } from '../core/services/goal.service';

@Component({
  selector: 'vl-goals-container',
  templateUrl: './goals-container.component.html',
  styleUrls: ['./goals-container.component.scss'],
})
export class GoalsContainerComponent implements OnInit {
  public goals: GoalModel<any>[];
  public title = '';
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
    public readonly sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.data.title || 'Daily Goals';
    this.goalType = this.route.snapshot.data.type || 'daily';
    this.goalsFacade.getGoalsByTypeWithCurrentAchievements$(this.goalType).subscribe((goals) => {
      this.goals = goals;
    });
    this.hoursLeft = this.goalService.getHoursLeftToAchieve(this.goalType);
  }

  handleGoalClicked(goal: GoalModel<any>) {
    if (!goal.achieved) {
      this.goalsFacade.achievedGoal(goal);
    } else {
      this.goalsFacade.unAchievedGoal(goal);
    }
  }

  handleGoalDetailClicked(goal: GoalModel<any>) {
    const dialogRef = this.dialog.open(GoalDetailDialogComponent, {
      width: '600px',
      data: { goal },
    });
    dialogRef.afterClosed().subscribe((action: GoalDetailDialogAction) => {
      switch (action) {
        case 'edit':
          break;
        case 'remove':
          this.goalsFacade.removeGoal(goal);
          break;
      }
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(GoalFormDialogComponent, {
      width: '400px',
      data: {
        defaultGoalType: this.goalType,
      },
    });

    dialogRef.afterClosed().subscribe((form) => {
      this.addGoal(form);
    });
  }

  addGoal(form: FormGroup) {
    if (!form?.valid) {
      return;
    }
    this.goalsFacade.addGoal(form.value);
  }
}
