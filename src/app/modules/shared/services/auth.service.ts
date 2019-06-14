import { User } from '../models/user.model';

export class AuthService {

  constructor() { }

  login(user: User) {
    user.password = '';
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
