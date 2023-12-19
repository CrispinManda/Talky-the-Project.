import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { User, usersDetails } from 'src/interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  registrationForm!:FormGroup
  error:boolean = false;
  success:boolean = false;
  errorMessage:string = ''
  successMessage:string = ''

  

  constructor(private fb: FormBuilder,private authService:AuthService,private apiService:ApiService,  private router: Router) { 
    this.registrationForm = this.fb.group({
      Username: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PasswordHash: ['', [Validators.required, Validators.minLength(6)]],
      // Add other form controls as needed
    });
  }

 
  // onSubmit() {
   
  // }


  async createUsers(){
    
    let user_details: User = this.registrationForm.value;
    
    
     let response: any= await this.authService.registerUser(user_details)
     if(response.error){
      this.error = true
      this.errorMessage = response.error

      setTimeout(() => {
        this.errorMessage = ''
      this.error = false

      }, 3000);


     }

     else if(response.message){
      this.success = true
      this.successMessage = "user Registered successfully"

           setTimeout( async() => {     
            this.success = false
            this.successMessage = ""
      
          this.router.navigate(['/login'])
        }, 2000);

     }
    }
    

  }

