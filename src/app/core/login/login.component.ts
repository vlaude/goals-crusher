import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'vl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup;
  public registerForm: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private readonly snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initSignInForm();
  }

  signIn() {
    if (!this.signInForm.valid) {
      return;
    }
    const { email, password } = this.signInForm.value;
    this.authService
      .loginWithEmailAndPassword(email, password)
      .then((_) => {
        this.router.navigate(['']);
      })
      .catch((error) => {
        switch (error.code) {
          case this.authService.WRONG_PASSWORD_CODE:
            this.snackbarService.show('🤔 Password incorrect !');
            break;
          case this.authService.USER_NOT_FOUND_CODE:
            this.snackbarService.show('Account not found, create one ! 💪');
            break;
        }
      });
  }

  private initSignInForm() {
    this.signInForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
}
