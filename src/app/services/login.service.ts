import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userToken: string;
  userRole: string;
  // logged = false;

  constructor(private http: HttpClient) {
    this.getUser();
  }

  logIn(email: string, password: string): Observable<any> {
    // console.log('DATA: ', { email, password });

    return this.http
      .post(`${environment.URL}/login`, { email, password })
      .pipe(this.mapUser());
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  logged(): boolean {
    if (localStorage.getItem('token') && localStorage.getItem('role')) {
      return true;
    } else {
      return false;
    }
  }

  private getUser(): any {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    if (localStorage.getItem('role')) {
      this.userRole = localStorage.getItem('role');
    } else {
      this.userRole = '';
    }

    const user = { token: this.userToken, role: this.userRole };

    return user;
  }

  private mapUser(): OperatorFunction<any, void> {
    return map((resp: any) => {
      if (!resp.token || !resp.user.role) {
        return;
      }

      // console.log('RESP: ', resp);

      // this.logged = true;

      localStorage.setItem('token', resp.token);
      localStorage.setItem('role', resp.user.role);
    });
  }
}
