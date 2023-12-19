import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { User } from 'src/interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-you-may-know',
  templateUrl: './people-you-may-know.component.html',
  styleUrls: ['./people-you-may-know.component.css'],
})
export class PeopleYouMayKnowComponent implements OnInit {
  users: User[] = [];

  searchText = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadPeopleYouMayKnow();
  }

  loadPeopleYouMayKnow() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response.users;
        console.log(this.users);

        // Assuming you have a userId and token available
        const userIdToFetch = 'User.userId';
        const token = 'token';

        // Fetch user details by ID
        this.userService.getUserById(userIdToFetch, token).subscribe(
          (userDetails) => {
            console.log('User details:', userDetails);
          },
          (error) => {
            console.error('Error loading user details:', error);
          }
        );
      },
      (error) => {
        console.error('Error loading people you may know:', error);
      }
    );
  }

  username: string = '';
  viewUser(user: any) {
    this.username = user.Username;
    console.log(this.username);


    this.router.navigate(['/profile', this.username]);


    const userDetails = {
      username: this.username,
    };

    console.log(userDetails);
    
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }
}
