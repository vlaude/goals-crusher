import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { PushNotificationsService } from '../services/push-notifications.service';

@Component({
  selector: 'vl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showNavbar = true;
  shouldHaveContainer: boolean;
  containerSizeOffest: number;

  constructor(private readonly router: Router, private readonly pushNotificationsService: PushNotificationsService) {
    this.router.events.subscribe((event) => {
      this.showNavbar = !(event instanceof NavigationEnd && event.url.endsWith('settings'));
      if (!(event instanceof RouterEvent) || event.url === '/settings') {
        this.shouldHaveContainer = true;
        this.containerSizeOffest = 4;
      } else if (!(event instanceof RouterEvent) || event.url.startsWith('/goals')) {
        this.shouldHaveContainer = true;
        this.containerSizeOffest = 4;
      } else {
        this.shouldHaveContainer = false;
        this.containerSizeOffest = 6;
      }
    });
  }

  ngOnInit(): void {}
}
