import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { SidenavService } from '../../core/services/sidenav.service';

@Component({
  selector: 'vl-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
})
export class ProfileContainerComponent implements OnInit {
  constructor(private readonly authService: AuthService, public sidenavService: SidenavService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout().then((_) => {
      window.location.reload();
    });
  }
}
