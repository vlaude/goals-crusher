import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'vl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup;
  public registerForm: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initSignInForm();
  }

  signIn() {
    if (!this.signInForm.valid) {
      return;
    }
    const { email, password } = this.signInForm.value;
    this.authService.loginWithEmailAndPassword(email, password).then(console.log).catch(console.error);
  }

  private initSignInForm() {
    this.signInForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
}
