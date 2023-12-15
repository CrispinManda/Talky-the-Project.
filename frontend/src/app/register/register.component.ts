import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { usersDetails } from 'src/interfaces/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService,private apiService:ApiService) { 
    this.registrationForm = this.fb.group({
      Username: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PasswordHash: ['', [Validators.required, Validators.minLength(6)]],
      // Add other form controls as needed
    });
  }

 
  // onSubmit() {
   
  // }

  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      }
    });
  }

  createUsers() {

    if (this.registrationForm.valid) {
      console.log (this.registrationForm.value);

      let details:usersDetails = this.registrationForm.value
      this.apiService.createUsers(details)
      // Handle form submission logic
      console.log('Form submitted:', this.registrationForm.value);
    } else {
      // Mark all fields as touched to display error messages
      this.markAllFieldsAsTouched(this.registrationForm);
    }
   
  }
   
}
