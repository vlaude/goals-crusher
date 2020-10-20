import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { slider } from '../../animation';

@Component({
  selector: 'vl-goals-tabs',
  templateUrl: './goals-tabs.component.html',
  styleUrls: ['./goals-tabs.component.scss'],
  animations: [slider],
})
export class GoalsTabsComponent implements OnInit {
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  tabRoutes = ['daily', 'weekly', 'lifelong'];
  currentIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the current tab index according to the route.
        this.currentIndex = this.tabRoutes.findIndex((tr) => this.router.url.endsWith(tr));
      }
    });
  }

  ngOnInit(): void {}

  swipe(event) {
    if (event.type === this.SWIPE_ACTION.LEFT && this.currentIndex < this.tabRoutes.length - 1) {
      this.currentIndex++;
      this.navigateToCurrentIndex();
    } else if (event.type === this.SWIPE_ACTION.RIGHT && this.currentIndex > 0) {
      this.currentIndex--;
      this.navigateToCurrentIndex();
    }
  }

  private navigateToCurrentIndex() {
    this.router.navigate([this.tabRoutes[this.currentIndex]], { relativeTo: this.route });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
