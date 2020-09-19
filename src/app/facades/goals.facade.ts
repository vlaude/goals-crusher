import { Injectable } from '@angular/core';
import { GoalsState } from '../state/goals.state';
import { combineLatest, Observable } from 'rxjs';
import { GoalModel } from '../core/models/goal.model';
import { GoalService } from '../core/services/goal.service';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { map } from 'rxjs/operators';
import { SnackbarService } from '../core/services/snackbar.service';
import { GoalType } from '../core/models/goal.type';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class GoalsFacade {
  private achievements: GoalAchievementModel<any>[];

  constructor(
    private readonly state: GoalsState,
    private readonly goalService: GoalService,
    private readonly snackbarService: SnackbarService
  ) {}

  getGoalsByTypeWithCurrentAchievements$(type: GoalType): Observable<GoalModel<'weekly'>[]> {
    return combineLatest([
      this.state.goals$.pipe(map((goals) => goals.filter((goal) => goal.type === type))),
      this.state.achievements$,
    ]).pipe(
      map(([goals, achievements]) => {
        this.achievements = achievements.map((a) => this.convertDate(a));
        return goals.map((g) => {
          return {
            achieved: this.goalService.isAchieved(g, this.achievements),
            ...g,
          };
        });
      })
    );
  }

  addGoal(goal: GoalModel<'weekly'>) {
    this.state
      .addGoal(goal)
      .then((_) => {
        this.snackbarService.show(`New goal added ! 👊`);
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.show(`❌ Error, unable to create the goal, please try again later.`);
      });
  }

  removeGoal(goal: GoalModel<any>) {
    this.state
      .removeGoal(goal)
      .then((_) => {
        this.snackbarService.show(`Goal ${goal.title} removed. ✌️`);
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.show(`❌ Error, unable to remove the goal, please try again later.`);
      });
  }

  achievedGoal(goal: GoalModel<any>) {
    const isAlreadyAchieved = this.goalService.isAchieved(goal, this.achievements);
    if (isAlreadyAchieved) return;
    const newAchievement: GoalAchievementModel<any> = {
      goalId: goal.id,
      achievedAt: new Date(),
    };
    this.state
      .addGoalAchievement(newAchievement)
      .then()
      .catch((err) => {
        console.error(err);
        this.snackbarService.show(`❌ Error, unable to achieved the goal, please try again later.`);
      });
  }

  unAchievedGoal(goal: GoalModel<any>) {
    const isNotAchieved = !this.goalService.isAchieved(goal, this.achievements);
    if (isNotAchieved) return;
    const achievement = this.goalService.getCurrentAchievement(goal, this.achievements);
    this.state
      .removeGoalAchievement(achievement)
      .then()
      .catch((err) => {
        console.error(err);
        this.snackbarService.show(`❌ Error, unable to unachieved the goal, please try again later.`);
      });
  }

  /**
   * Convert Firebase timestamp to javascript date format.
   * See https://medium.com/@peterkracik/firebase-timestamp-to-javascript-date-format-876a42978c10.
   * @param firebaseObject
   */
  private convertDate(firebaseObject: any) {
    if (!firebaseObject) return null;

    for (const [key, value] of Object.entries(firebaseObject)) {
      // covert items inside array
      if (value && Array.isArray(value)) firebaseObject[key] = value.map((item) => this.convertDate(item));

      // convert inner objects
      if (value && typeof value === 'object') {
        firebaseObject[key] = this.convertDate(value);
      }

      // convert simple properties
      if (value && value.hasOwnProperty('seconds')) firebaseObject[key] = (value as firestore.Timestamp).toDate();
    }
    return firebaseObject;
  }
}
