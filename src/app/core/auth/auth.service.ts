import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: UserModel;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.router.navigate(['']);
        console.log('User', user);
      } else {
        this.router.navigate(['login']);
        console.log('No user ☹️');
      }
    });
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async loginWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }
}
