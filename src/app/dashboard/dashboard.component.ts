import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../core/services/sidenav.service';
import { GoalsFacade } from '../facades/goals.facade';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalModel } from '../core/models/goal.model';
import { GoalType } from '../core/models/goal.type';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { MomentService } from '../core/services/moment.service';

@Component({
  selector: 'vl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  goals: GoalModel<any>[];
  achievements: GoalAchievementModel<any>[];

  constructor(private readonly goalsFacade: GoalsFacade, public readonly momentService: MomentService) {}

  ngOnInit(): void {
    zip(
      this.goalsFacade.getGoalsByTypeWithCurrentAchievements$('daily'),
      this.goalsFacade.getGoalsByTypeWithCurrentAchievements$('weekly'),
      this.goalsFacade.getGoalsByTypeWithCurrentAchievements$('lifelong')
    )
      .pipe(map((arrays) => arrays.reduce((flat, val) => flat.concat(val), [])))
      .subscribe((goals) => {
        this.goals = goals;
      });

    this.goalsFacade
      .getAchievements$()
      .pipe(map((achievements) => achievements.sort((a, b) => (a.achievedAt < b.achievedAt ? 1 : -1))))
      .subscribe((achievements) => {
        this.achievements = achievements;
      });
  }

  public getGoalsCountByType(type: GoalType): number {
    return this.goals.filter((goal) => goal.type === type).length;
  }

  public getGoalsAchievedCountByType(type: GoalType): number {
    return this.goals.filter((goal) => goal.type === type && goal.achieved).length;
  }

  public getLastGoalsAchieved(count = 3): GoalModel<any>[] {
    return this.achievements.slice(0, count).map((achievement) => {
      return {
        achievedAt: achievement.achievedAt,
        ...this.goals.find((goal) => goal.id === achievement.goalId),
      };
    });
  }

  public getLastCreatedGoals(count = 3): GoalModel<any>[] {
    return this.goals.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, count);
  }

  // TODO Highlight goal type when all goals of this type are achieved.
  public isGoalsCompletedByType(type: GoalType): boolean {
    const goalsByType = this.goals.filter((goal) => goal.type === type);
    return goalsByType.filter((goal) => goal.achieved).length === goalsByType.length;
  }
}
