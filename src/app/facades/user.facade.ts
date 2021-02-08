import { Injectable } from '@angular/core';
import { AppState } from '../state/app.state';
import { UserModel } from '../core/models/user.model';
import { SnackbarService } from '../core/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(private readonly state: AppState, private readonly snackbarService: SnackbarService) {}

  getCurrentUser(): UserModel {
    return this.state.user;
  }

  updateCurrentUser(user: Partial<UserModel>): void {
    // Update email
    if (user.email && this.getCurrentUser().email !== user.email) {
      this.state
        .updateCurrentUserEmail(user.email)
        .then((_) => {
          this.snackbarService.show(`📧 Email updated.`);
        })
        .catch((error) => {
          console.log('Fail to update current user email 😥');
          console.error(error);
          if (error.code === 'auth/requires-recent-login') {
            this.snackbarService.show('Oops ! You need to reauthenticate in order to update your email 😕.', 'danger');
          }
        });
    }
  }

  updateCurrentUserAvatar(avatarUrl: string): void {
    this.state
      .updateCurrentUserAvatar(avatarUrl)
      .then((_) => {
        this.snackbarService.show(`Avatar updated 🚀.`);
      })
      .catch((error) => {
        console.log('Fail to update current user avatar 😥');
        console.error(error);
        if (error.code === 'auth/requires-recent-login') {
          this.snackbarService.show('Oops ! You need to reauthenticate in order to update your avatar 😕.', 'danger');
        } else {
          this.snackbarService.show('Error while updating your avatar 😕. Please try again later.', 'danger');
        }
      });
  }
}
