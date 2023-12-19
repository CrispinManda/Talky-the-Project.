import { Component } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-talky',
  templateUrl: './talky.component.html',
  styleUrls: ['./talky.component.css'],
})
export class TalkyComponent {
  users: any[] = [];
  posts: any[] = [];
imageUrl: any;

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.loadPeopleYouMayKnow();
    this.loadAllPosts();
  }

  loadPeopleYouMayKnow() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response.users;
      },
      (error) => {
        console.error('Error loading people you may know:', error);
      }
    );
  }

  loadAllPosts() {
    this.postService.getAllPosts().subscribe(
      (response) => {
        this.posts = response;
        console.log(response);
        
      },
      
      (error) => {
        console.error('Error loading all posts:', error);
      }
    );
  }
}
