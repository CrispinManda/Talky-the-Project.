import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: string;
  loginSuccess: string;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // Perform login logic (you can replace this with your actual login service)
    if (this.loginForm.valid) {
      // Replace the following with your actual login service
      const { email, password } = this.loginForm.value;
      if (email === 'example@example.com' && password === 'password') {
        this.loginSuccess = 'Login successful. Redirecting to home...';
        // Simulate redirection after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      } else {
        this.loginError = 'Invalid email or password';
      }
    } else {
      this.loginError = 'Please enter valid email and password';
    }
  }
}
