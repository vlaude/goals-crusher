import { Component, OnInit } from '@angular/core';
import { GoalType } from '../core/models/goal.type';
import { GoalModel } from '../core/models/goal.model';
import { GoalsFacade } from '../facades/goals.facade';
import { combineLatest, Observable, Subject, zip } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { MomentService } from '../core/services/moment.service';
import { HighlightDate } from './calendar/calendar.component';
import { MatDialog } from '@angular/material/dialog';
import { AchieveGoalDialogComponent } from '../shared/components/achieve-goal-dialog/achieve-goal-dialog.component';
import { GoalService } from '../core/services/goal.service';
import { UnachieveGoalDialogComponent } from '../shared/components/unachieve-goal-dialog/unachieve-goal-dialog.component';
import { SelectItem } from '../shared/components/select/select.component';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'vl-calendars-container',
  templateUrl: './calendars-container.component.html',
  styleUrls: ['./calendars-container.component.scss'],
})
export class CalendarsContainerComponent implements OnInit {
  goalType$ = new Subject<GoalType>();
  allGoals$: Observable<GoalModel<any>[]>;
  selectableGoalsItems: SelectItem[];

  achievements: GoalAchievementModel<any>[];
  goalTypeSelected: GoalType = 'daily';
  goalSelected: GoalModel<any>;
  highlightDates: HighlightDate[] = [];

  constructor(
    private readonly goalsFacade: GoalsFacade,
    private readonly goalService: GoalService,
    private readonly momentService: MomentService,
    private readonly dialog: MatDialog,
    private readonly modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.allGoals$ = zip(
      this.goalsFacade.getGoalsByTypeWithCurrentAchievements$('daily'),
      this.goalsFacade.getGoalsByTypeWithCurrentAchievements$('weekly'),
      this.goalsFacade.getGoalsByTypeWithCurrentAchievements$('lifelong')
    ).pipe(map((arrays) => arrays.reduce((flat, val) => flat.concat(val), [])));

    combineLatest([this.allGoals$.pipe(startWith([])), this.goalType$.pipe(startWith('daily'))])
      .pipe(
        map(([goals, goalType]) => goals?.filter((goal) => goal.type === goalType)),
        map((goals) =>
          goals.map((goal) => {
            return {
              name: goal.title,
              value: goal,
            };
          })
        )
      )
      .subscribe((selectItems: SelectItem[]) => {
        console.log(selectItems);
        this.selectableGoalsItems = selectItems;
      });

    this.goalsFacade.getAchievements$().subscribe((achievements) => {
      this.achievements = achievements;
      if (this.goalSelected) {
        // TODO improve this.
        this.handleGoalSelected();
      }
    });
  }

  /**
   * Generate highlight dates according to the goal type and its achievements.
   * Highlight the dates when the goal has been achieved.
   */
  private generateHighlightDates(goal: GoalModel<any>, achievement: GoalAchievementModel<any>): HighlightDate[] {
    return goal.type === 'daily'
      ? [this.generateDailyGoalHighlightDate(goal, achievement)]
      : goal.type === 'weekly'
      ? this.generateWeeklyGoalHighlightDates(goal, achievement)
      : [];
  }

  private generateDailyGoalHighlightDate(
    goal: GoalModel<'daily'>,
    achievement: GoalAchievementModel<'daily'>
  ): HighlightDate {
    return {
      date: achievement.achievedAt,
      color: true,
      badge: this.momentService.isSameDay(achievement.achievedAt, goal.createdAt) ? '★' : '',
    };
  }

  /**
   * When a weekly goal is achieved, highlight the whole week.
   */
  private generateWeeklyGoalHighlightDates(
    goal: GoalModel<'weekly'>,
    achievement: GoalAchievementModel<'weekly'>
  ): HighlightDate[] {
    return this.momentService.getAllWeekDays(achievement.achievedAt).map((day) => {
      return {
        date: day,
        color: true,
        badge: this.momentService.isSameDay(day, goal.createdAt) ? '★' : '',
      };
    });
  }

  private openAchieveGoalModal(goal: GoalModel<any>, date?: Date): void {
    const dialogRef = this.dialog.open(AchieveGoalDialogComponent, {
      width: '400px',
      data: {
        goal,
        date,
      },
    });
    dialogRef.afterClosed().subscribe((achieve) => {
      if (achieve) {
        this.goalsFacade.achievedGoal(goal, date);
      }
    });
  }

  private openUnachieveGoalModal(goal: GoalModel<any>, date?: Date): void {
    const dialogRef = this.dialog.open(UnachieveGoalDialogComponent, {
      width: '400px',
      data: {
        goal,
        date,
      },
    });
    dialogRef.afterClosed().subscribe((unachieve) => {
      if (unachieve) {
        this.goalsFacade.unAchievedGoal(goal, date);
      }
    });
  }

  public displayGoal(goal: GoalModel<any>): string {
    return goal?.title;
  }

  public handleGoalSelected() {
    this.highlightDates = this.achievements
      .filter((achievement) => achievement.goalId === this.goalSelected.id)
      .map((achievement) => this.generateHighlightDates(this.goalSelected, achievement))
      .concat([{ date: this.goalSelected.createdAt, color: null, badge: '★' }])
      .reduce((acc, val) => acc.concat(val), []);

    this.modalService.open('calendar-modal');
  }

  public handleDateClicked(event: Date): void {
    if (this.momentService.isAfterToday(event)) return;
    const isGoalSelectedAchievedAtClickedDate = this.goalService.isAchieved(
      this.goalSelected,
      this.achievements,
      event
    );
    if (!isGoalSelectedAchievedAtClickedDate) {
      this.openAchieveGoalModal(this.goalSelected, event);
    } else {
      this.openUnachieveGoalModal(this.goalSelected, event);
    }
  }
}
