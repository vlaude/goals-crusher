import { Injectable } from '@angular/core';
import { GoalModel } from '../core/models/goal.model';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { map, startWith } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserModel } from '../core/models/user.model';
import { firestore } from 'firebase';

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
      this.goals$ = this.goalsCollection.valueChanges({ idField: 'id' }).pipe(
        startWith([]),
        map((goals: GoalModel<any>[]) => goals.map((goal) => this.convertDate(goal)))
      );
      this.achievementsCollection = this.afs
        .collection<GoalAchievementModel<any>>('goal-achievements')
        .doc(this.user.uid)
        .collection('data');
      this.achievements$ = this.achievementsCollection.valueChanges({ idField: 'id' }).pipe(
        startWith([]),
        map((achievements: GoalAchievementModel<any>[]) => achievements.map((a) => this.convertDate(a)))
      );

      this.initialized.next();
      this.initialized.complete();
    });
  }

  async updateCurrentUserEmail(newEmail: string): Promise<void> {
    return (await this.afAuth.currentUser).updateEmail(newEmail);
  }

  async updateCurrentUserAvatar(avatarUrl: string): Promise<void> {
    return (await this.afAuth.currentUser).updateProfile({ photoURL: avatarUrl });
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

  /**
   * Convert Firebase timestamp to javascript date format.
   * See https://medium.com/@peterkracik/firebase-timestamp-to-javascript-date-format-876a42978c10.
   */
  // tslint:disable-next-line:typedef
  private convertDate(firebaseObject: any) {
    if (!firebaseObject) {
      return null;
    }

    for (const [key, value] of Object.entries(firebaseObject)) {
      // covert items inside array
      if (value && Array.isArray(value)) {
        firebaseObject[key] = value.map((item) => this.convertDate(item));
      }

      // convert inner objects
      if (value && typeof value === 'object') {
        firebaseObject[key] = this.convertDate(value);
      }

      // convert simple properties
      if (value && value.hasOwnProperty('seconds')) {
        firebaseObject[key] = (value as firestore.Timestamp).toDate();
      }
    }
    return firebaseObject;
  }
}
