import { Injectable } from '@angular/core';
import { GoalModel } from '../models/goal.model';
import { GoalAchievementModel } from '../models/goal-achievement.model';

@Injectable({
  providedIn: 'root',
})
export class WeeklyGoalService {
  constructor() {}

  isAchieved(weeklyGoal: GoalModel<'weekly'>, goalAchievements: GoalAchievementModel<'weekly'>[]) {
    const goalAchievement = goalAchievements.find((ga) => ga.goalId === weeklyGoal.id);
    if (!goalAchievement) {
      return false;
    }
    if (weeklyGoal.countToBeAchieved > 0) {
      return goalAchievement.count === weeklyGoal.countToBeAchieved;
    }
    return true;
  }
}
