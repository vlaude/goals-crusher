import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Moment } from 'moment';

export interface CalendarDay {
  dayNumber?: number;
  color?: boolean;
  badge?: string;
  isOutOfMonth?: boolean;
}

export interface HighlightDate {
  date: Date;
  color?: boolean;
  badge?: string;
}

@Component({
  selector: 'vl-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() highlightDates: HighlightDate[];
  @Input() title: string;
  @Output() dateClicked = new EventEmitter<Date>();

  calendarDays: CalendarDay[] = [];
  currentMoment: Moment;
  switchMonth$ = new BehaviorSubject<'Previous' | 'Next'>(null);

  get currentMonth(): string {
    return this.currentMoment.format('MMMM');
  }

  get currentYear(): string {
    return this.currentMoment.format('YYYY');
  }

  constructor() {}

  ngOnInit(): void {
    this.initSwitchMonthStream();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.highlightDates) {
      this.refreshCalendar();
    }
  }

  isAfterToday(calendarDay: CalendarDay): boolean {
    const date = moment();
    date.set('date', calendarDay.dayNumber);
    date.set('month', this.currentMoment.month());
    date.set('year', this.currentMoment.year());
    return date.isAfter(moment());
  }

  isToday(calendarDay: CalendarDay): boolean {
    return this.currentMoment.isSame(moment(), 'month') && calendarDay.dayNumber === new Date().getDate();
  }

  onCalendarDayClicked(calendarDay: CalendarDay): void {
    if (calendarDay.isOutOfMonth) return;
    const date = this.currentMoment.set('date', calendarDay.dayNumber).toDate();
    this.dateClicked.emit(date);
  }

  /**
   * Return the highlight date according to the day number.
   */
  private getHighlightDateByDayNumber(dayNumber: number): HighlightDate {
    return this.highlightDates.find(
      (hd) => moment(hd.date).isSame(this.currentMoment, 'month') && hd.date.getDate() === dayNumber
    );
  }

  private generateCalendarDays(): CalendarDay[] {
    return this.generateOutOfMonthCalendarDays().concat(
      Array(this.currentMoment.daysInMonth())
        .fill(0)
        .map((x, i) => {
          const dayNumber = i + 1;
          const highlightDate = this.getHighlightDateByDayNumber(dayNumber);
          return {
            dayNumber,
            color: highlightDate?.color,
            badge: highlightDate?.badge,
          };
        })
    );
  }

  /**
   * Generate the first days of the first weeks that are not in the current month.
   */
  private generateOutOfMonthCalendarDays(): CalendarDay[] {
    let dayStart = this.currentMoment.startOf('month').day();
    dayStart = dayStart === 0 ? 7 : dayStart;
    return Array(dayStart - 1).fill({ isOutOfMonth: true });
  }

  private initSwitchMonthStream() {
    this.switchMonth$.subscribe((change) => {
      this.refreshCalendar(change);
    });
  }

  private refreshCalendar(change?: 'Previous' | 'Next') {
    this.switchCurrentMomentMonth(change);
    this.calendarDays = this.generateCalendarDays();
  }

  private switchCurrentMomentMonth(change: 'Previous' | 'Next') {
    this.currentMoment =
      change === 'Previous'
        ? this.currentMoment.subtract(1, 'month')
        : change === 'Next'
        ? this.currentMoment.add(1, 'month')
        : this.currentMoment
        ? this.currentMoment
        : moment().startOf('month');
  }
}
