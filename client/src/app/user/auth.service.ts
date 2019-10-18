import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, UserError } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
currentUser: User;

get isLoggedIn(): boolean {
  return !!this.currentUser;
}

  constructor(private http: HttpClient) { }

  private userUrl = 'api/user';

  register(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.userUrl}/register`, user, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.userUrl}/login`, {email, password}, { headers })
      .pipe(
        tap(data => {
          this.currentUser = data;
        }),
        catchError(this.handleError)
      );
  }

  checkAuthenticationStatus(): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/checkidentity`)
      .pipe(
        tap( data => {
          if ( data instanceof Object) {
             this.currentUser = data;
            }
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    this.currentUser = null;
    return this.http.get<User>(`${this.userUrl}/logout`);
  }

  private handleError(err: HttpErrorResponse ) {
    const dataErr = new UserError();
    dataErr.statusText = err.statusText;
    dataErr.message = err.error.message;
    return throwError(dataErr);
  }
}
