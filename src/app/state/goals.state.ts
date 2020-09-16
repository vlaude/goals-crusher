import { Injectable } from '@angular/core';
import { GoalModel } from '../core/models/goal.model';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoalsState {
  private weeklyGoalsCollection: AngularFirestoreCollection<GoalModel<any>>;
  private goalAchievementsCollection: AngularFirestoreCollection<GoalAchievementModel<any>>;
  public weeklyGoals$: Observable<GoalModel<'weekly'>[]>;
  public goalAchievements$: Observable<GoalAchievementModel<any>[]>;

  constructor(private afs: AngularFirestore) {
    this.weeklyGoalsCollection = this.afs.collection<GoalModel<'weekly'>>('weekly-goals');
    this.weeklyGoals$ = this.weeklyGoalsCollection.valueChanges({ idField: 'id' }).pipe(startWith([]));
    this.goalAchievementsCollection = this.afs.collection<GoalAchievementModel<any>>('goal-achievements');
    this.goalAchievements$ = this.goalAchievementsCollection.valueChanges({ idField: 'id' }).pipe(startWith([]));
  }

  addWeeklyGoal(weeklyGoal: GoalModel<'weekly'>): Promise<DocumentReference> {
    return this.weeklyGoalsCollection.add(weeklyGoal);
  }

  removeWeeklyGoal(weeklyGoal: GoalModel<'weekly'>): Promise<void> {
    const weeklyGoalDoc = this.afs.doc<GoalModel<'weekly'>>(`weekly-goals/${weeklyGoal.id}`);
    return weeklyGoalDoc.delete();
  }

  addGoalAchievement(goalAchievement: GoalAchievementModel<any>): Promise<DocumentReference> {
    return this.goalAchievementsCollection.add(goalAchievement);
  }

  removeGoalAchievement(goalAchievement: GoalAchievementModel<any>): Promise<void> {
    const goalAchievementDoc = this.afs.doc<GoalAchievementModel<any>>(`goal-achievements/${goalAchievement.id}`);
    return goalAchievementDoc.delete();
  }
}
