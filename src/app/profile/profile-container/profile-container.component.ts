import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../core/services/sidenav.service';
import { UserModel } from '../../core/models/user.model';
import { AuthService } from '../../core/auth/auth.service';
import { UserFacade } from '../../facades/user.facade';

@Component({
  selector: 'vl-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
})
export class ProfileContainerComponent implements OnInit {
  user: UserModel;

  constructor(
    private readonly userFacade: UserFacade,
    private readonly authService: AuthService,
    public sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.user = this.userFacade.getCurrentUser();
  }

  logout() {
    this.authService.logout().then((_) => {
      window.location.reload();
    });
  }
}
