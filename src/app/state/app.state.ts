import { Injectable } from '@angular/core';
import { GoalModel } from '../core/models/goal.model';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { startWith } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserModel } from '../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  private goalsCollection: AngularFirestoreCollection<GoalModel<any>>;
  private achievementsCollection: AngularFirestoreCollection<GoalAchievementModel<any>>;
  public goals$: Observable<GoalModel<any>[]>;
  public achievements$: Observable<GoalAchievementModel<any>[]>;
  public user: UserModel;

  public initialized = new Subject<void>();

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      this.goalsCollection = this.afs.collection(`goals`).doc(this.user.uid).collection('data');
      this.goals$ = this.goalsCollection.valueChanges({ idField: 'id' }).pipe(startWith([]));
      this.achievementsCollection = this.afs
        .collection<GoalAchievementModel<any>>('goal-achievements')
        .doc(this.user.uid)
        .collection('data');
      this.achievements$ = this.achievementsCollection.valueChanges({ idField: 'id' }).pipe(startWith([]));

      this.initialized.next();
      this.initialized.complete();
    });
  }

  addGoal(goal: GoalModel<any>): Promise<DocumentReference> {
    return this.goalsCollection.add(goal);
  }

  updateGoal(goal: Partial<GoalModel<any>>): Promise<void> {
    const goalDoc = this.goalsCollection.doc(goal.id);
    return goalDoc.update(goal);
  }

  removeGoal(goal: GoalModel<any>): Promise<void> {
    const goalDoc = this.goalsCollection.doc(goal.id);
    return goalDoc.delete();
  }

  addGoalAchievement(achievement: GoalAchievementModel<any>): Promise<DocumentReference> {
    return this.achievementsCollection.add(achievement);
  }

  removeGoalAchievement(achievement: GoalAchievementModel<any>): Promise<void> {
    const achievementDoc = this.achievementsCollection.doc(achievement.id);
    return achievementDoc.delete();
  }
}
