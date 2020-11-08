import { Component, OnInit } from '@angular/core';
import { GoalType } from '../core/models/goal.type';
import { GoalModel } from '../core/models/goal.model';
import { GoalsFacade } from '../facades/goals.facade';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GoalAchievementModel } from '../core/models/goal-achievement.model';
import { MomentService } from '../core/services/moment.service';
import { HighlightDate } from './calendar/calendar.component';
import { GoalService } from '../core/services/goal.service';
import { SelectItem } from '../shared/components/select/select.component';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'vl-calendars-container',
  templateUrl: './calendars-container.component.html',
  styleUrls: ['./calendars-container.component.scss'],
})
export class CalendarsContainerComponent implements OnInit {
  allGoals$: Observable<GoalModel<any>[]> = this.goalsFacade.getGoalsWithCurrentAchievements$();
  goalType$ = new Subject<GoalType>();
  /**
   * Transform goals that can be selected (according to the goal type) into selectable items by vl-select component.
   */
  selectableGoalsItems$: Observable<SelectItem[]> = combineLatest([
    this.allGoals$.pipe(startWith([])),
    this.goalType$.pipe(startWith('daily')),
  ]).pipe(
    map(([goals, goalType]) => goals?.filter((goal) => goal.type === goalType)),
    map((goals) =>
      goals.map((goal) => {
        return {
          name: goal.title,
          value: goal,
        };
      })
    )
  );

  achievements: GoalAchievementModel<any>[];
  achieveGoalModalConfirmText = 'Achieve';
  achieveGoalModalText = '';
  dateSelected: Date;
  goalTypeSelected: GoalType = 'daily';
  goalSelected: GoalModel<any>;
  highlightDates: HighlightDate[] = [];
  unachieveGoalModalConfirmText = 'Unachieve';
  unachieveGoalModalText = '';

  constructor(
    public readonly modalService: ModalService,
    private readonly goalService: GoalService,
    private readonly goalsFacade: GoalsFacade,
    private readonly momentService: MomentService
  ) {}

  ngOnInit(): void {
    this.goalsFacade.getAchievements$().subscribe((achievements) => {
      this.achievements = achievements;
      if (this.goalSelected) {
        // TODO improve this.
        this.handleGoalSelected();
      }
    });
  }

  achieveSeletedGoalAtSelectedDate() {
    this.modalService.close('achieve-goal-confirm-modal');
    this.goalsFacade.achievedGoal(this.goalSelected, this.dateSelected);
  }

  handleDateClicked(date: Date): void {
    if (this.momentService.isAfterToday(date)) return;
    this.dateSelected = date;
    const isGoalSelectedAchievedAtClickedDate = this.goalService.isAchieved(this.goalSelected, this.achievements, date);
    this.modalService.close('calendar-modal');
    if (!isGoalSelectedAchievedAtClickedDate) {
      this.modalService.open('achieve-goal-confirm-modal');
      this.achieveGoalModalText = `Are you sure you want to mark ${
        this.goalSelected.title
      } as achieved on ${this.momentService.format(date)} ?`;
    } else {
      this.unachieveGoalModalText = `Are you sure you want to mark ${
        this.goalSelected.title
      } as non achieved on ${this.momentService.format(date)} ?`;
      this.modalService.open('unachieve-goal-confirm-modal');
    }
  }

  handleGoalSelected() {
    this.highlightDates = this.achievements
      .filter((achievement) => achievement.goalId === this.goalSelected.id)
      .map((achievement) => this.generateHighlightDates(this.goalSelected, achievement))
      .concat([{ date: this.goalSelected.createdAt, color: null, badge: '★' }])
      .reduce((acc, val) => acc.concat(val), []);

    this.modalService.open('calendar-modal');
  }

  unachieveSeletedGoalAtSelectedDate() {
    this.modalService.close('unachieve-goal-confirm-modal');
    this.goalsFacade.unAchievedGoal(this.goalSelected, this.dateSelected);
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
}
