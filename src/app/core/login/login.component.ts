import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'vl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLoading = false;

  constructor(
    public readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initSignInForm();
  }

  signIn(): void {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = this.form.value;
    this.authService
      .loginWithEmailAndPassword(email, password)
      .then((_) => {
        location.reload();
      })
      .catch((error) => {
        switch (error.code) {
          case this.authService.WRONG_PASSWORD_CODE:
            this.snackbarService.show('🤔 Password incorrect !');
            break;
          case this.authService.USER_NOT_FOUND_CODE:
            this.snackbarService.show('Account not found 😥.');
            break;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  private initSignInForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
