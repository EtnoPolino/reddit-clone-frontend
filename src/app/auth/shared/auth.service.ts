import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/Signup-request.payload';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/signup',
      signupRequestPayload,
      { responseType: 'text' } // si on ne met pas ça, ça marchera mais je n'aurais pas l'affichage de mes résultats cad le message registration succefful dans la console.
    );
  }

  login(loginRequestPayload: LoginRequestPayload) {
    this.httpClient
      .post<LoginResponsePayload>(
        'http://localhost:8080/api/auth/login',
        loginRequestPayload
      )
      .pipe(map((data) => {}));
  }
}
