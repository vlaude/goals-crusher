import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'vl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
