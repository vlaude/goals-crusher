import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  constructor() {}

  format(date: Date, format?: string): string {
    return moment(date).format(format || 'MMMM Do YYYY');
  }

  // TODO remove duplicate functions.
  isToday(date: Date): boolean {
    return moment(date).isSame(new Date(), 'day');
  }

  isThisDay(date: Date): boolean {
    return moment(date).isSame(moment(), 'day');
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return moment(date1).isSame(date2, 'date');
  }

  isSameWeek(date1: Date, date2: Date): boolean {
    return moment(date1).isSame(date2, 'isoWeek');
  }

  isThisWeek(date: Date): boolean {
    return moment(date).isSame(moment(), 'isoWeek');
  }

  isAfterToday(date: Date): boolean {
    return moment(date).isAfter(moment());
  }

  endOfTheDayHoursLeft(): number {
    return moment().endOf('day').diff(moment(), 'hours');
  }

  endOfTheWeekHoursLeft(): number {
    return moment().endOf('isoWeek').diff(moment(), 'hours');
  }

  getAllWeekDays(date: Date): Date[] {
    const startOfWeek = moment(date).startOf('week').add(1, 'day');
    const result: Date[] = [startOfWeek.toDate()];
    for (let i = 1; i < 7; i++) {
      result.push(new Date(startOfWeek.add(1, 'day').toDate()));
    }
    return result;
  }
}
