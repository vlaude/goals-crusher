import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from 'firebase/app';
import { cfaSignIn, cfaSignOut, mapUserToUserInfo } from 'capacitor-firebase-auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly USER_NOT_FOUND_CODE = 'auth/user-not-found';
  readonly WRONG_PASSWORD_CODE = 'auth/wrong-password';

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.router.navigate(['']);
      }
    });
  }

  async hasGoogleAuthProviderLinked(): Promise<boolean> {
    return !!(await this.afAuth.currentUser).providerData.find((provider) => provider.providerId === 'google.com');
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    // Auth using Capacitor plugin https://github.com/baumblatt/capacitor-firebase-auth#usage
    return cfaSignIn('google.com')
      .pipe(mapUserToUserInfo())
      .subscribe((user: UserInfo) => console.log(user));
  }

  logout() {
    cfaSignOut().subscribe((_) => {
      this.router.navigate(['/login']);
    });
  }

  registerWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async sendEmailVerification(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async sendPasswordResetEmail(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
