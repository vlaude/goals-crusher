import { Injectable } from '@angular/core';
import { GoalModel } from '../models/goal.model';
import { GoalAchievementModel } from '../models/goal-achievement.model';
import { MomentService } from './moment.service';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(private readonly momentService: MomentService) {}

  public isAchieved(goal: GoalModel<any>, achievements: GoalAchievementModel<any>[]): boolean {
    switch (goal.type) {
      case 'daily':
        return this.isAchievedToday(goal, achievements);
      case 'weekly':
        return this.isAchievedThisWeek(goal, achievements);
      case 'lifelong':
        return achievements.filter((a) => a.goalId === goal.id)?.length > 0;
    }
  }

  private isAchievedToday(goal: GoalModel<any>, achievements: GoalAchievementModel<any>[]): boolean {
    return (
      achievements.filter((a) => a.goalId === goal.id).filter((a) => this.momentService.isThisDay(a.achievedAt))
        .length > 0
    );
  }

  private isAchievedThisWeek(goal: GoalModel<any>, achievements: GoalAchievementModel<any>[]): boolean {
    return (
      achievements.filter((a) => a.goalId === goal.id).filter((a) => this.momentService.isThisWeek(a.achievedAt))
        .length > 0
    );
  }
}
