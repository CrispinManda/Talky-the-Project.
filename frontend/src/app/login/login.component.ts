import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/users';
import { userLogin } from 'src/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registrationForm!: FormGroup;

  errorMessage: string = '';
  email: string = '';
  name: string = '';
  error: boolean = false;
  success: boolean = false;

  successMessage: string = '';
  loggingIn: boolean = false;
  loggedInState: false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      PasswordHash: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  async login() {
    let user_details: userLogin = this.loginForm.value;

    let response: any = await this.authService.login(user_details);

    console.log(response);

    if (response.error) {
      this.error = true;
      this.errorMessage = response.error;

      setTimeout(() => {
        this.errorMessage = '';
        this.error = false;
      }, 3000);
    } else if (response.message) {
      this.success = true;

      this.successMessage = 'user login successfully';
      setTimeout(() => {
        this.success = false;
        this.successMessage = '';
        this.router.navigate(['/'])
      }, 2000);
    }
  }
}
