import { Component, OnInit } from '@angular/core';
import { GoalsFacade } from '../facades/goals.facade';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalModel } from '../core/models/goal.model';
import { GoalType } from '../core/models/goal.type';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { MomentService } from '../core/services/moment.service';

interface GoalSummary {
  count: number;
  achieved: number;
}

@Component({
  selector: 'vl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  goals$: Observable<GoalModel<any>[]> = this.goalsFacade.getGoalsWithCurrentAchievements$();
  achievements$: Observable<GoalAchievementModel<any>[]> = this.goalsFacade
    .getAchievements$()
    .pipe(map((achievements) => achievements.sort((a, b) => (a.achievedAt < b.achievedAt ? 1 : -1))));

  mapToGoalSummaryOperator = (type: GoalType) =>
    map((goals: GoalModel<any>[]) => {
      return {
        count: goals.filter((goal) => goal.type === type).length,
        achieved: goals.filter((goal) => goal.type === type && goal.achieved).length,
      };
    });

  mapToLastAchievedOperator = (count = 3) =>
    map(([goals, achievements]) => {
      return achievements.slice(0, count).map((achievement) => {
        return {
          achievedAt: achievement.achievedAt,
          ...goals.find((goal) => goal.id === achievement.goalId),
        };
      });
    });

  mapToLastCreatedOperator = (count = 3) =>
    map((goals: GoalModel<any>[]) => goals.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, count));

  mapToGoalsDoneOperator = () =>
    map((goalSummary: GoalSummary) => goalSummary.achieved === goalSummary.count && goalSummary.count !== 0);

  dailyGoalSummary$: Observable<GoalSummary> = this.goals$.pipe(this.mapToGoalSummaryOperator('daily'));
  weeklyGoalSummary$: Observable<GoalSummary> = this.goals$.pipe(this.mapToGoalSummaryOperator('weekly'));
  lifelongGoalSummary$: Observable<GoalSummary> = this.goals$.pipe(this.mapToGoalSummaryOperator('lifelong'));
  dailyGoalsDone$: Observable<boolean> = this.dailyGoalSummary$.pipe(this.mapToGoalsDoneOperator());
  lifelongGoalsDone$: Observable<boolean> = this.lifelongGoalSummary$.pipe(this.mapToGoalsDoneOperator());
  weeklyGoalsDone$: Observable<boolean> = this.weeklyGoalSummary$.pipe(this.mapToGoalsDoneOperator());
  lastGoalsAchieved$: Observable<GoalModel<any>[]> = combineLatest([this.goals$, this.achievements$]).pipe(
    this.mapToLastAchievedOperator()
  );
  lastGoalsCreated$: Observable<GoalModel<any>[]> = this.goals$.pipe(this.mapToLastCreatedOperator());

  constructor(private readonly goalsFacade: GoalsFacade, public readonly momentService: MomentService) {}

  ngOnInit(): void {}
}
