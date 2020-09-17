import { Component, OnInit } from '@angular/core';
import { GoalModel } from '../core/models/goal.model';
import { GoalsFacade } from '../facades/goals.facade';
import { SidenavService } from '../core/services/sidenav.service';
import { MatDialog } from '@angular/material/dialog';
import { WeeklyGoalFormComponent } from './weekly-goal-form/weekly-goal-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalDetailAction, WeeklyGoalDetailComponent } from './weekly-goal-detail/weekly-goal-detail.component';

@Component({
  selector: 'vl-weekly-goals-container',
  templateUrl: './weekly-goals-container.component.html',
  styleUrls: ['./weekly-goals-container.component.scss'],
})
export class WeeklyGoalsContainerComponent implements OnInit {
  weeklyGoals: GoalModel<'weekly'>[];

  constructor(
    private goalsFacade: GoalsFacade,
    public readonly sidenavService: SidenavService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.goalsFacade.getWeeklyGoalsWithCurrentAchievements$().subscribe((weeklyGoals) => {
      this.weeklyGoals = weeklyGoals;
    });
  }

  handleGoalClicked(goal: GoalModel<any>) {
    if (!goal.achieved) {
      this.goalsFacade.achievedGoal(goal);
    } else {
      this.goalsFacade.unAchievedGoal(goal);
    }
  }

  handleGoalDetailClicked(goal: GoalModel<any>) {
    const dialogRef = this.dialog.open(WeeklyGoalDetailComponent, {
      width: '600px',
      data: {
        goal,
      },
    });
    dialogRef.afterClosed().subscribe((action: GoalDetailAction) => {
      switch (action) {
        case 'remove':
          this.goalsFacade.removeWeeklyGoal(goal);
          break;
        case 'edit':
          console.log('edit');
          break;
      }
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(WeeklyGoalFormComponent, {
      width: '400px',
      data: {
        form: this.fb.group({
          title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
          description: ['', Validators.maxLength(250)],
          type: ['', Validators.required],
        }),
      },
    });

    dialogRef.afterClosed().subscribe((form) => {
      this.addWeeklyGoal(form);
    });
  }

  addWeeklyGoal(form: FormGroup) {
    if (!form?.valid) {
      return;
    }
    this.goalsFacade.addWeeklyGoal(form.value);
  }
}
