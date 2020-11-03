import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { UserFacade } from '../facades/user.facade';
import { UserModel } from '../core/models/user.model';
import { ModalService } from '../core/services/modal.service';
import { SnackbarService } from '../core/services/snackbar.service';
const { version } = require('../../../package.json');

@Component({
  selector: 'vl-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  hasGoogleAuthProviderLinked: boolean;
  hasFacebookAuthProviderLinked: boolean = false;
  user: UserModel;
  version: string = version;

  get isUserEmailVerified(): boolean {
    return this.user.emailVerified;
  }

  constructor(
    private readonly userFacade: UserFacade,
    private readonly authService: AuthService,
    public readonly modalService: ModalService,
    private snackbarService: SnackbarService
  ) {
    this.authService.hasGoogleAuthProviderLinked().then((linked) => (this.hasGoogleAuthProviderLinked = linked));
  }

  ngOnInit(): void {
    this.user = this.userFacade.getCurrentUser();
  }

  handleResetPasswordRequestCancelClicked() {
    this.closeResetPasswordRequestModal();
  }

  handleResetPasswordRequestSendRequestClicked(email: string) {
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

  handleSendVerificationEmailCanceled() {
    this.closeConfirmSendVerificationEmailModal();
  }

  handleSendVerificationEmailConfirmed() {
    this.closeConfirmSendVerificationEmailModal();
    this.sendEmailVerification();
  }

  logOut() {
    this.authService.logout();
  }

  openResetPasswordRequestModal() {
    if (!this.isUserEmailVerified) return;
    this.modalService.open('send-reset-password-request-modal');
  }

  private closeConfirmSendVerificationEmailModal() {
    this.modalService.close('confirm-send-verification-email-modal');
  }

  private closeResetPasswordRequestModal() {
    this.modalService.close('send-reset-password-request-modal');
  }

  private sendEmailVerification() {
    if (this.isUserEmailVerified) return;
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
