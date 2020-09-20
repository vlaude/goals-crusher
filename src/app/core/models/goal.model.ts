import { GoalType } from './goal.type';

export interface GoalModel<T extends GoalType> {
  id: string;
  title: string;
  description?: string;
  type: T;
  countToBeAchieved?: number;
  achievedCount?: number;
  achieved?: boolean;
  createdAt?: Date;
}
