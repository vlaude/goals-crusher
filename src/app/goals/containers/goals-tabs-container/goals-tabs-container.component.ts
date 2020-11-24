import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { slider } from '../../../animation';

@Component({
  selector: 'vl-goals-tabs-container',
  templateUrl: './goals-tabs-container.component.html',
  styleUrls: ['./goals-tabs-container.component.scss'],
  animations: [slider],
})
export class GoalsTabsContainerComponent implements OnInit {
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  tabRoutes = ['daily', 'weekly', 'lifelong'];
  currentTabIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the current tab index according to the route.
        this.currentTabIndex = this.tabRoutes.findIndex((tr) => this.router.url.endsWith(tr));
      }
    });
  }

  ngOnInit(): void {}

  prepareRoute(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  swipe(event): void {
    if (event.type === this.SWIPE_ACTION.LEFT && this.currentTabIndex < this.tabRoutes.length - 1) {
      this.currentTabIndex++;
      this.navigateToCurrentIndex();
    } else if (event.type === this.SWIPE_ACTION.RIGHT && this.currentTabIndex > 0) {
      this.currentTabIndex--;
      this.navigateToCurrentIndex();
    }
  }

  private navigateToCurrentIndex(): void {
    this.router.navigate([this.tabRoutes[this.currentTabIndex]], { relativeTo: this.route });
  }
}
