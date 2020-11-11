import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

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

  async loginWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }
}
