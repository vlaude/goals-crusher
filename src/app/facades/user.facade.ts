import { Injectable } from '@angular/core';
import { AppState } from '../state/app.state';
import { UserModel } from '../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(private readonly state: AppState) {}

  getCurrentUser(): UserModel {
    return this.state.user;
  }
}
