// src/app/user.interface.ts
export interface User {
  userId: string;
  Username: string;
  Email: string;
  PasswordHash: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  registrationDate: Date;
  profilePictureUrl?: string;
  bio?: string;
  website?: string;
  location?: string;
  isVerified: boolean;
  otpSecret?: string;
  welcomed: boolean;
}






export interface usersDetails {
    Username: string;
    Email: string;
    PasswordHash: string;
   
  }
  
  