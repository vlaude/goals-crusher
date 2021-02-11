import { Injectable } from '@angular/core';
import { AppState } from '../state/app.state';
import { UserModel } from '../core/models/user.model';
import { SnackbarService } from '../core/services/snackbar.service';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(
    private readonly state: AppState,
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService
  ) {}

  getCurrentUser(): UserModel {
    return this.state.user;
  }

  updateCurrentUserEmail(email: string): void {
    this.state
      .updateCurrentUserEmail(email)
      .then((_) => {
        this.snackbarService.show(`Email updated 📧`);
        return this.authService.sendEmailVerification();
      })
      .catch((error) => {
        console.error('Fail to update current user email 😥');
        console.error(error);
        if (error.code === 'auth/requires-recent-login') {
          this.snackbarService.show('Oops ! You need to reauthenticate in order to update your email 😕', 'danger');
        } else if (error.code === 'auth/email-already-in-use') {
          this.snackbarService.show('The email address is already in use by another account 😕', 'danger');
        } else {
          this.snackbarService.show('Error while updating your email 😕. Please try again later', 'danger');
        }
        throw error;
      })
      .then((_) => {
        setTimeout(() => {
          this.snackbarService.show(`We've sent you a verification email 💌`);
        }, 3000);
      })
      .catch((error) => {
        console.error('Fail to send a verification email 😥');
        console.error(error);
      });
  }

  updateCurrentUserAvatar(avatarUrl: string): void {
    this.state
      .updateCurrentUserAvatar(avatarUrl)
      .then((_) => {
        this.snackbarService.show(`Avatar updated 🚀`);
      })
      .catch((error) => {
        console.error('Fail to update current user avatar 😥');
        console.error(error);
        if (error.code === 'auth/requires-recent-login') {
          this.snackbarService.show('Oops ! You need to reauthenticate in order to update your avatar 😕', 'danger');
        } else {
          this.snackbarService.show('Error while updating your avatar 😕. Please try again later.', 'danger');
        }
      });
  }
}
