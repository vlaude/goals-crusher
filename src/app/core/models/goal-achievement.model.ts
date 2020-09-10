import { GoalType } from './goal.type';

export interface GoalAchievementModel<T extends GoalType> {
  id?: string;
  goalId: string;
  count?: number;
  achievedAt: Date;
}
