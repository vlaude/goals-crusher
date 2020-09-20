import { Injectable } from '@angular/core';
import { GoalModel } from '../models/goal.model';
import { GoalAchievementModel } from '../models/goal-achievement.model';
import { MomentService } from './moment.service';
import { GoalType } from '../models/goal.type';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(private readonly momentService: MomentService) {}

  public isAchieved(goal: GoalModel<any>, achievements: GoalAchievementModel<any>[]): boolean {
    return !!this.getCurrentAchievement(goal, achievements);
  }

  public getCurrentAchievement(
    goal: GoalModel<any>,
    achievements: GoalAchievementModel<any>[]
  ): GoalAchievementModel<any> {
    switch (goal.type) {
      case 'daily':
        return this.getTodayAchievement(goal, achievements);
      case 'weekly':
        return this.getThisWeekAchievement(goal, achievements);
      case 'lifelong':
        return achievements.find((a) => a.goalId === goal.id);
    }
  }

  public getHoursLeftToAchieve(goalType: GoalType) {
    switch (goalType) {
      case 'daily':
        return this.momentService.endOfTheDayHoursLeft();
      case 'weekly':
        return this.momentService.endOfTheWeekHoursLeft();
    }
  }

  private getTodayAchievement(
    goal: GoalModel<any>,
    achievements: GoalAchievementModel<any>[]
  ): GoalAchievementModel<any> {
    return achievements.find((a) => a.goalId === goal.id && this.momentService.isThisDay(a.achievedAt));
  }

  private getThisWeekAchievement(
    goal: GoalModel<any>,
    achievements: GoalAchievementModel<any>[]
  ): GoalAchievementModel<any> {
    return achievements.find((a) => a.goalId === goal.id && this.momentService.isThisWeek(a.achievedAt));
  }
}
