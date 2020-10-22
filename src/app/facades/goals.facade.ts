import { Injectable } from '@angular/core';
import { AppState } from '../state/app.state';
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
  private readonly GOAL_ACHIEVED_MESSAGE = 'Nice job 👍 !';
  private readonly GOAL_UNACHIEVED_MESSAGE = 'Oh, what happened ? 😕';

  private achievements: GoalAchievementModel<any>[];

  constructor(
    private readonly state: AppState,
    private readonly goalService: GoalService,
    private readonly snackbarService: SnackbarService
  ) {}

  getGoalsByTypeWithCurrentAchievements$(type: GoalType): Observable<GoalModel<any>[]> {
    return combineLatest([
      this.state.goals$.pipe(map((goals) => goals.filter((goal) => goal.type === type))),
      this.state.achievements$,
    ]).pipe(
      map(([goals, achievements]) => {
        this.achievements = achievements.map((a) => this.convertDate(a));
        return goals.map((g) => {
          let goal = {
            achieved: this.goalService.isAchieved(g, this.achievements),
            ...g,
          };
          goal = this.convertDate(goal);
          return goal;
        });
      })
    );
  }

  getAchievements$(): Observable<GoalAchievementModel<any>[]> {
    return this.state.achievements$.pipe(map((achievements) => achievements.map((a) => this.convertDate(a))));
  }

  addGoal(goal: GoalModel<any>) {
    goal.createdAt = new Date();
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

  updateGoal(goal: Partial<GoalModel<any>>) {
    goal.updatedAt = new Date();
    this.state
      .updateGoal(goal)
      .then((_) => {
        this.snackbarService.show(`Goal ${goal.title} updated. 🤠`);
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.show(`❌ Error, unable to update the goal, please try again later.`);
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

  achievedGoal(goal: GoalModel<any>, date?: Date) {
    const isAlreadyAchieved = this.goalService.isAchieved(goal, this.achievements, date);
    if (isAlreadyAchieved) return;
    const newAchievement: GoalAchievementModel<any> = {
      goalId: goal.id,
      achievedAt: date || new Date(),
    };
    this.state
      .addGoalAchievement(newAchievement)
      .then((x) => {
        this.snackbarService.show(this.GOAL_ACHIEVED_MESSAGE);
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.show(`❌ Error, unable to achieved the goal, please try again later.`);
      });
  }

  unAchievedGoal(goal: GoalModel<any>, date?: Date) {
    const isAchieved = this.goalService.isAchieved(goal, this.achievements, date);
    if (!isAchieved) return;
    const achievement = date
      ? this.goalService.getAchievementByDate(goal, this.achievements, date)
      : this.goalService.getCurrentAchievement(goal, this.achievements);
    this.state
      .removeGoalAchievement(achievement)
      .then((_) => {
        this.snackbarService.show(this.GOAL_UNACHIEVED_MESSAGE);
      })
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
