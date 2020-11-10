import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'vl-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public isLoading = false;

  get nameFormControl(): AbstractControl {
    return this.form.controls.name;
  }

  get emailFormControl(): AbstractControl {
    return this.form.controls.email;
  }

  get passwordFormControl(): AbstractControl {
    return this.form.controls.password;
  }

  constructor(
    public readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  register() {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = this.form.value;
    const name = this.form.value.name.trim();
    this.authService
      .registerWithEmailAndPassword(email, password, name)
      .then((_) => {
        location.reload();
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.show('😭 Error, could not create your account, please try again later.');
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  private initRegisterForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
