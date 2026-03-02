import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private currentUser: any = null;
  constructor(private router: Router) {}
  
  getAccessToken() {
      return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
      return localStorage.getItem('refreshToken');
  }

  logout() {
      this.currentUser = null;
      localStorage.clear();
      this.router.navigate(['/login']);
  }

  getCurrentUser(): any | null {
        const token = this.getAccessToken();
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            const isExpired = payload.exp * 1000 < Date.now();
            if (isExpired) {
                this.logout();
                return null;
            }

            return {
                _id: payload.id,
                email: payload.email,
                username: payload.username,
                role: payload.role
            };

        } catch {
            return null;
        }
    }
}
