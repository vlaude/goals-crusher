import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PushNotificationsService } from '../services/push-notifications.service';

@Component({
  selector: 'vl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showNavbar = true;

  constructor(private readonly router: Router, private readonly pushNotificationsService: PushNotificationsService) {
    this.router.events.subscribe((event) => {
      this.showNavbar = !(event instanceof NavigationEnd && event.url.endsWith('settings'));
    });
  }

  shouldHaveContainer(): boolean {
    return this.router.url.startsWith('/goals') || this.router.url.startsWith('/settings');
  }

  ngOnInit(): void {}
}
