import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'users';
  private currentUserKey = 'currentUser';

  register(user: any): boolean {
    const users = this.getUsers();
    if (users.find(u => u.email === user.email)) return false;
    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): any | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  getLoggedInUser(): any | null {
    return this.getCurrentUser();
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  updateCurrentUser(data: any): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(data));
    const users = this.getUsers();
    const index = users.findIndex(u => u.email === data.email);
    if (index !== -1) {
      users[index] = data;
      localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    }
  }

  private getUsers(): any[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }
}

