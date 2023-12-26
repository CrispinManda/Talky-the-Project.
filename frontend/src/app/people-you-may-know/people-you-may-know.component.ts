import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { User } from 'src/interfaces/users';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-people-you-may-know',
  templateUrl: './people-you-may-know.component.html',
  styleUrls: ['./people-you-may-know.component.css'],
})
export class PeopleYouMayKnowComponent implements OnInit {
  users: User[] = [];

  searchText = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  // id: string = '';
  // id2: string = '';

  // user: User[] = [];

  // async getAllUsers() {
    

  //   this.route.params.subscribe((params) => {
  //     this.id2 = params['UserId'];
  //   });

  //   let user = await this.userService.getUserById(this.id2);

  //   console.log(user);

  //   this.user = user;
  }

 

