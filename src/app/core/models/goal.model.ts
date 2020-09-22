import { GoalType } from './goal.type';

export interface GoalModel<T extends GoalType> {
  id: string;
  title: string;
  description?: string;
  type: T;
  achieved?: boolean;
  achievedAt?: Date;
  createdAt?: Date;
}
