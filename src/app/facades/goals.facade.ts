import { Injectable } from '@angular/core';
import { AppState } from '../state/app.state';
import { combineLatest, Observable } from 'rxjs';
import { GoalModel } from '../core/models/goal.model';
import { GoalService } from '../core/services/goal.service';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { filter, map, startWith } from 'rxjs/operators';
import { SnackbarService } from '../core/services/snackbar.service';
import { GoalType } from '../core/models/goal.type';

export interface GoalSummary {
  type?: GoalType;
  count: number;
  achieved: number;
  done: boolean;
}

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
  ) {
    this.state.achievements$.subscribe((achievements) => (this.achievements = achievements));
  }

  getGoalsWithCurrentAchievements$(type?: GoalType): Observable<GoalModel<any>[]> {
    return combineLatest([
      this.state.goals$.pipe(map((goals) => goals.filter((goal) => (type ? goal.type === type : true)))),
      this.state.achievements$,
    ]).pipe(
      map(([goals, achievements]) => {
        return goals.map((g) => {
          return {
            achieved: this.goalService.isAchieved(g, achievements),
            ...g,
          };
        });
      })
    );
  }

  getGoalsCount$(type?: GoalType): Observable<number> {
    return this.state.goals$.pipe(
      map((goals) => goals.filter((goal) => (type ? goal.type === type : true))),
      map((goals) => goals.length)
    );
  }

  getGoalsAchievedCount$(type?: GoalType): Observable<number> {
    return this.getGoalsWithCurrentAchievements$(type).pipe(
      map((goals) => goals.filter((goal) => goal.achieved).length)
    );
  }

  getLastGoalsCreated$(count = 3): Observable<GoalModel<any>[]> {
    return this.state.goals$.pipe(
      map((goals: GoalModel<any>[]) => goals.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, count))
    );
  }

  getGoalSummary(type?: GoalType): Observable<GoalSummary> {
    return this.getGoalsWithCurrentAchievements$(type).pipe(
      map((goals: GoalModel<any>[]) => {
        const count = goals.length;
        const achieved = goals.filter((goal) => goal.achieved).length;
        return {
          type,
          count,
          achieved,
          done: count === achieved,
        };
      })
    );
  }

  getAchievements$(): Observable<GoalAchievementModel<any>[]> {
    return this.state.achievements$;
  }

  getAchievementsCount$(): Observable<number> {
    return this.state.achievements$.pipe(map((achievements) => achievements.length));
  }

  getLastGoalsAchieved$(count = 3): Observable<GoalModel<any>[]> {
    return combineLatest([
      this.state.goals$.pipe(startWith([])),
      this.getAchievements$().pipe(
        startWith([]),
        map((achievements) => achievements.sort((a, b) => (a.achievedAt < b.achievedAt ? 1 : -1)))
      ),
    ]).pipe(
      map(([goals, achievements]) => {
        achievements = achievements.filter((achievement) => !!goals.find((goal) => goal.id === achievement.goalId));
        return achievements.slice(0, count).map((achievement) => {
          return {
            achievedAt: achievement.achievedAt,
            ...goals.find((goal) => goal.id === achievement.goalId),
          };
        });
      })
    );
  }

  addGoal(goal: GoalModel<any>): void {
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

  updateGoal(goal: Partial<GoalModel<any>>): void {
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

  removeGoal(goal: GoalModel<any>): void {
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

  achieveGoal(goal: GoalModel<any>, date?: Date): void {
    const isAlreadyAchieved = this.goalService.isAchieved(goal, this.achievements, date);
    if (isAlreadyAchieved) {
      return;
    }
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

  unAchieveGoal(goal: GoalModel<any>, date?: Date): void {
    const isAchieved = this.goalService.isAchieved(goal, this.achievements, date);
    if (!isAchieved) {
      return;
    }
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
}
