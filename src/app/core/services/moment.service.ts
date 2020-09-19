import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  constructor() {}

  isThisDay(date: Date): boolean {
    return moment(date).isSame(moment(), 'day');
  }

  isThisWeek(date: Date): boolean {
    return moment(date).isSame(moment(), 'week');
  }
}
