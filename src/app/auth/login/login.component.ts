import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginRequestPayload!: LoginRequestPayload;
  loginForm!: FormGroup;
  isError!: boolean;
  registerSuccessMessage!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginRequestPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (
        params['registered'] !== undefined &&
        params['registered'] === 'true'
      ) {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage =
          'Please Check your inbox for activation email ' +
          'activate your account before you Log in!';
      }
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestPayload).subscribe({
      next: () => {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Successful');
        console.log('login successfull');
      },
      error: (error) => {
        this.isError = true;
        throwError(() => error);
      },
    });
  }
}
