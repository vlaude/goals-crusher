import { Component, OnInit } from '@angular/core';
import { GoalsFacade, GoalSummary } from '../facades/goals.facade';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalModel } from '../core/models/goal.model';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { MomentService } from '../core/services/moment.service';

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

  goalSummaries$: Observable<GoalSummary[]> = zip(
    this.goalsFacade.getGoalSummary('daily'),
    this.goalsFacade.getGoalSummary('weekly'),
    this.goalsFacade.getGoalSummary('lifelong')
  );
  lastGoalsAchieved$: Observable<GoalModel<any>[]> = this.goalsFacade.getLastGoalsAchieved$();
  lastGoalsCreated$: Observable<GoalModel<any>[]> = this.goalsFacade.getLastGoalsCreated$();

  constructor(private readonly goalsFacade: GoalsFacade, public readonly momentService: MomentService) {}

  ngOnInit(): void {}
}
