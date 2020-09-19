import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public isLoading = false;

  get signInEmailFormControl(): AbstractControl {
    return this.signInForm.controls.email;
  }

  get signInPasswordFormControl(): AbstractControl {
    return this.signInForm.controls.password;
  }

  get registerEmailFormControl(): AbstractControl {
    return this.registerForm.controls.email;
  }

  get registerPasswordFormControl(): AbstractControl {
    return this.registerForm.controls.password;
  }

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private readonly snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initSignInForm();
    this.initRegisterForm();
  }

  signIn() {
    if (!this.signInForm.valid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = this.signInForm.value;
    this.authService
      .loginWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case this.authService.WRONG_PASSWORD_CODE:
            this.snackbarService.show('🤔 Password incorrect !');
            break;
          case this.authService.USER_NOT_FOUND_CODE:
            this.snackbarService.show('Account not found, create one ! 💪');
            break;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = this.registerForm.value;
    this.authService
      .registerWithEmailAndPassword(email, password)
      .then((_) => {
        this.snackbarService.show('Welcome on Goals Crusher ! 😁');
      })
      .catch((error) => {
        console.error(error);
        this.snackbarService.show('😭 Error, could not create your account, please try again later.');
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  private initSignInForm() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private initRegisterForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
