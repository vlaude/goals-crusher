import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeLeft',
})
export class TimeLeftPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    const daysLeft = (value / 24).toFixed(0);
    return value > 24 ? `${daysLeft}d ${value % 24}h ` : `${value}h`;
  }
}
