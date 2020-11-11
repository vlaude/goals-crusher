import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const slider = trigger('routeAnimations', [
  transition('DailyTab => WeeklyTab', slideTo('right')),
  transition('WeeklyTab => DailyTab', slideTo('left')),
  transition('WeeklyTab => LifelongTab', slideTo('right')),
  transition('LifelongTab => *', slideTo('left')),
]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(':enter', [animate('600ms ease', style({ [direction]: '0%' }))]),
      query(':leave', [animate('600ms ease', style({ [direction]: '100%' }))], optional),
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
