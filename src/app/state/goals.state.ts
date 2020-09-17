import { Injectable } from '@angular/core';
import { GoalModel } from '../core/models/goal.model';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { startWith } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class GoalsState {
  private userId: string;

  private weeklyGoalsCollection: AngularFirestoreCollection<GoalModel<any>>;
  private goalAchievementsCollection: AngularFirestoreCollection<GoalAchievementModel<any>>;
  public weeklyGoals$: Observable<GoalModel<'weekly'>[]>;
  public goalAchievements$: Observable<GoalAchievementModel<any>[]>;

  public initialized = new Subject<void>();

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      this.userId = user?.uid;
      this.weeklyGoalsCollection = this.afs.collection(`weekly-goals`).doc(this.userId).collection('data');
      this.weeklyGoals$ = this.weeklyGoalsCollection.valueChanges({ idField: 'id' }).pipe(startWith([]));
      this.goalAchievementsCollection = this.afs
        .collection<GoalAchievementModel<any>>('goal-achievements')
        .doc(this.userId)
        .collection('data');
      this.goalAchievements$ = this.goalAchievementsCollection.valueChanges({ idField: 'id' }).pipe(startWith([]));

      this.initialized.next();
      this.initialized.complete();
    });
  }

  addWeeklyGoal(weeklyGoal: GoalModel<'weekly'>): Promise<DocumentReference> {
    return this.weeklyGoalsCollection.add(weeklyGoal);
  }

  removeWeeklyGoal(weeklyGoal: GoalModel<'weekly'>): Promise<void> {
    const weeklyGoalDoc = this.weeklyGoalsCollection.doc(weeklyGoal.id);
    return weeklyGoalDoc.delete();
  }

  addGoalAchievement(goalAchievement: GoalAchievementModel<any>): Promise<DocumentReference> {
    return this.goalAchievementsCollection.add(goalAchievement);
  }

  removeGoalAchievement(goalAchievement: GoalAchievementModel<any>): Promise<void> {
    const goalAchievementDoc = this.goalAchievementsCollection.doc(goalAchievement.id);
    return goalAchievementDoc.delete();
  }
}
