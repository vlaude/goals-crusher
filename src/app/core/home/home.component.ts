import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'vl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showNavbar: boolean = true;

  constructor(private readonly router: Router) {
    this.router.events.subscribe((event) => {
      this.showNavbar = !(event instanceof NavigationEnd && event.url.endsWith('settings'));
    });
  }

  isOnGoalsRoute(): boolean {
    return this.router.url.startsWith('/goals');
  }

  ngOnInit(): void {}
}
