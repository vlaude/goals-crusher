import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { UserFacade } from '../facades/user.facade';
import { UserModel } from '../core/models/user.model';
import { ModalService } from '../core/services/modal.service';
import { SnackbarService } from '../core/services/snackbar.service';
import { FormGroup } from '@angular/forms';
const { version } = require('../../../package.json');

@Component({
  selector: 'vl-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  hasGoogleAuthProviderLinked: boolean;
  hasFacebookAuthProviderLinked = false;
  user: UserModel;
  version: string = version;

  get isUserEmailVerified(): boolean {
    return this.user.emailVerified;
  }

  constructor(
    public readonly modalService: ModalService,
    private readonly userFacade: UserFacade,
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService
  ) {
    this.authService.hasGoogleAuthProviderLinked().then((linked) => (this.hasGoogleAuthProviderLinked = linked));
  }

  ngOnInit(): void {
    this.user = this.userFacade.getCurrentUser();
  }

  handleEditEmailFormSubmitted(form: FormGroup): void {
    this.userFacade.updateCurrentUser(form.value);
  }

  handleResetPasswordRequestCancelClicked(): void {
    this.closeResetPasswordRequestModal();
  }

  handleResetPasswordRequestSendRequestClicked(email: string): void {
    this.closeResetPasswordRequestModal();
    this.authService
      .sendPasswordResetEmail(email)
      .then((_) => {
        this.snackbarService.show('Reset password email sent 💌.');
      })
      .catch((err) => {
        this.snackbarService.show(`Error: ${err.message} 😥.`, 'danger');
      });
  }

  handleSendVerificationEmailCanceled(): void {
    this.closeConfirmSendVerificationEmailModal();
  }

  handleSendVerificationEmailConfirmed(): void {
    this.closeConfirmSendVerificationEmailModal();
    this.sendEmailVerification();
  }

  logOut(): void {
    this.authService.logout();
  }

  openResetPasswordRequestModal(): void {
    if (!this.isUserEmailVerified) {
      return;
    }
    this.modalService.open('send-reset-password-request-modal');
  }

  private closeConfirmSendVerificationEmailModal(): void {
    this.modalService.close('confirm-send-verification-email-modal');
  }

  private closeResetPasswordRequestModal(): void {
    this.modalService.close('send-reset-password-request-modal');
  }

  private sendEmailVerification(): void {
    if (this.isUserEmailVerified) {
      return;
    }
    this.authService
      .sendEmailVerification()
      .then((_) => {
        this.snackbarService.show('Verification email sent 💌.');
      })
      .catch((err) => {
        this.snackbarService.show(`Error: ${err.message} 😥.`, 'danger');
      });
  }
}
