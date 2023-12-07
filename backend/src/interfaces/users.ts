import { Request } from "express";    

export interface User {
    UserID: string;
    Username: string;
    PasswordHash: string;
    Email: string;
    FullName?: string;
    Bio?: string;
    ProfilePictureURL?: string;
    RegistrationDate: string; // Assuming a string for simplicity; you might want to use a Date type
    FollowersCount: number;
    FollowingCount: number;
    PostsCount: number;
}

export interface LoginUser extends Request{
    email: string,
    password: string
}