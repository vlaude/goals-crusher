import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { cfaSignIn, cfaSignOut, mapUserToUserInfo } from 'capacitor-firebase-auth';
import { Router } from '@angular/router';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly USER_NOT_FOUND_CODE = 'auth/user-not-found';
  readonly WRONG_PASSWORD_CODE = 'auth/wrong-password';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async hasGoogleAuthProviderLinked(): Promise<boolean> {
    return !!(await this.afAuth.currentUser).providerData.find((provider) => provider.providerId === 'google.com');
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    // Auth using Capacitor plugin https://github.com/baumblatt/capacitor-firebase-auth#usage
    cfaSignIn('google.com')
      .pipe(mapUserToUserInfo())
      .subscribe((_) => {
        location.reload();
      });
  }

  logout() {
    cfaSignOut().subscribe((_) => {
      this.router.navigate(['/login']);
    });
  }

  async registerWithEmailAndPassword(email: string, password: string, name?: string) {
    const userCredential: UserCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if (name) {
      try {
        await userCredential.user.updateProfile({ displayName: name });
      } catch (err) {
        throw Error('Unable to set the display name of the new user.' + err.message);
      }
    }
    return userCredential;
  }

  async sendEmailVerification(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async sendPasswordResetEmail(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
