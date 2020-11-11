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

  public isAchieved(goal: GoalModel<any>, achievements: GoalAchievementModel<any>[], date?: Date): boolean {
    return date
      ? !!this.getAchievementByDate(goal, achievements, date)
      : !!this.getCurrentAchievement(goal, achievements);
  }

  public getAchievementByDate(
    goal: GoalModel<any>,
    achievements: GoalAchievementModel<any>[],
    date: Date
  ): GoalAchievementModel<any> {
    const goalAchievements = achievements.filter((a) => a.goalId === goal.id);
    switch (goal.type) {
      case 'daily':
        return goalAchievements.find((a) => this.momentService.isSameDay(a.achievedAt, date));
      case 'weekly':
        return goalAchievements.find((a) => this.momentService.isSameWeek(a.achievedAt, date));
    }
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

  public getHoursLeftToAchieve(goalType: GoalType): number {
    switch (goalType) {
      case 'daily':
        return this.momentService.endOfTheDayHoursLeft();
      case 'weekly':
        return this.momentService.endOfTheWeekHoursLeft();
    }
  }
}
