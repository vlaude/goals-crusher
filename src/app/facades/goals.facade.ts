import { Injectable } from '@angular/core';
import { GoalsState } from '../state/goals.state';
import { combineLatest, Observable } from 'rxjs';
import { GoalModel } from '../core/models/goal.model';
import { WeeklyGoalService } from '../core/services/weekly-goal.service';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoalsFacade {
  private goalAchievements: GoalAchievementModel<any>[];

  constructor(
    private readonly state: GoalsState,
    private readonly weeklyGoalService: WeeklyGoalService,
    private readonly snackBar: MatSnackBar
  ) {}

  getWeeklyGoalsWithCurrentAchievements$(): Observable<GoalModel<'weekly'>[]> {
    return combineLatest([this.state.weeklyGoals$, this.state.goalAchievements$]).pipe(
      map(([weeklyGoals, goalAchievements]) => {
        this.goalAchievements = goalAchievements;
        // Only weekly goal achievements.
        goalAchievements = goalAchievements.filter((ga) => weeklyGoals.find((wg) => wg.id === ga.goalId));
        return weeklyGoals.map((wg) => {
          return {
            achieved: this.weeklyGoalService.isAchieved(wg, goalAchievements),
            achievedCount: goalAchievements.find((ga) => ga.goalId === wg.id)?.count,
            ...wg,
          };
        });
      })
    );
  }

  addWeeklyGoal(weeklyGoal: GoalModel<'weekly'>) {
    this.state
      .addWeeklyGoal(weeklyGoal)
      .then((_) => {
        this.snackBar.open(`New goal added ! 👊`, null, {
          duration: 5000,
          horizontalPosition: 'center',
        });
      })
      .catch((err) => {
        console.error(err);
        this.snackBar.open(`❌ Error, unable to create the goal, please try again later.`);
      });
  }

  removeWeeklyGoal(weeklyGoal: GoalModel<'weekly'>) {
    this.state
      .removeWeeklyGoal(weeklyGoal)
      .then((_) => {
        this.snackBar.open(`Goal ${weeklyGoal.title} removed. ✌️`, null, {
          duration: 5000,
        });
      })
      .catch((err) => {
        console.error(err);
        this.snackBar.open(`❌ Error, unable to remove the goal, please try again later.`);
      });
  }

  achievedGoal(goal: GoalModel<any>) {
    const newGoalAchievement: GoalAchievementModel<any> = {
      goalId: goal.id,
      achievedAt: new Date(),
    };
    this.state
      .addGoalAchievement(newGoalAchievement)
      .then()
      .catch((err) => {
        console.error(err);
        this.snackBar.open(`❌ Error, unable to achieved the goal, please try again later.`);
      });
  }

  unAchievedGoal(goal: GoalModel<any>) {
    const goalAchievement = this.goalAchievements.find((ga) => ga.goalId === goal.id);
    this.state
      .removeGoalAchievement(goalAchievement)
      .then()
      .catch((err) => {
        console.error(err);
        this.snackBar.open(`❌ Error, unable to unachieved the goal, please try again later.`);
      });
  }
}
