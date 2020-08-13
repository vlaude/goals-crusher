import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
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

  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
