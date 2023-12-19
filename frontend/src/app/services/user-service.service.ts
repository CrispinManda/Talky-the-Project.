import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4400/user';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/register`, user, { headers });
  }

  login(credentials: { Email: string; PasswordHash: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }

  getAllUsers(): Observable<any> {
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token,
    });

    return this.http
      .get(`${this.apiUrl}`, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  getUserById(userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token,
    });

    return this.http
      .get(`${this.apiUrl}/${userId}`, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  toggleFollowUser(
    followingUserId: string,
    followedUserId: string,
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token,
    });

    const body = {
      followingUserId,
      followedUserId,
    };

    return this.http
      .post(`${this.apiUrl}/toggleFollowUser`, body, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  getFollowings(userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token,
    });

    return this.http
      .get(`${this.apiUrl}/getFollowings/${userId}`, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Add other methods as needed...

  // Example of handling errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }
}
