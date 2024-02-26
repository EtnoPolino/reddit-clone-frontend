import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/Signup-request.payload';
import { Observable, map, tap } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername(),
  };

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/signup',
      signupRequestPayload,
      { responseType: 'text' } // si on ne met pas ça, ça marchera mais je n'aurais pas l'affichage de mes résultats cad le message registration succefful dans la console.
    );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>( //le return type est un login response
        'http://localhost:8080/api/auth/login',
        loginRequestPayload
      )
      .pipe(
        map((data: any) => {
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
          this.localStorage.store('authenticateToken', data.authenticateToken);

          return true;
        })
      );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticateToken');
  }

  refreshToken() {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.clear('authenticateToken');
          this.localStorage.clear('expireAt');

          this.localStorage.store(
            'authenticateToken',
            response.authenticateToken
          );
          this.localStorage.store('expireAt', response.expireAt);
        })
      );
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }
}
