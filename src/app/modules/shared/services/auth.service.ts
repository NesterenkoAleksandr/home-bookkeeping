import { User } from '../models/user.model';

export class AuthService {
  private isAuthenticated = false;

  constructor() { }

  login(user: User) {
    user.password = '';
    window.localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

}
