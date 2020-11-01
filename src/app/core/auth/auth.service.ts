import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from 'firebase/app';
import { cfaSignIn, mapUserToUserInfo } from 'capacitor-firebase-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly WRONG_PASSWORD_CODE = 'auth/wrong-password';
  public readonly USER_NOT_FOUND_CODE = 'auth/user-not-found';

  constructor(private afAuth: AngularFireAuth) {}

  loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    // Auth using Capacitor plugin https://github.com/baumblatt/capacitor-firebase-auth#usage
    return cfaSignIn('google.com')
      .pipe(mapUserToUserInfo())
      .subscribe((user: UserInfo) => console.log(user));
  }

  registerWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }
}
