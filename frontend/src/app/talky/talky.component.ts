import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { PostService } from '../services/post.service';
import { UploadService } from '../services/cloudinary/upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-talky',
  templateUrl: './talky.component.html',
  styleUrls: ['./talky.component.css'],
})
export class TalkyComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  imageUrl: any;
  addPostForm: FormGroup;
  files: any[] = [];
  showReply: boolean = false;

  constructor(
    private upload: UploadService,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.loadPeopleYouMayKnow();
    this.loadAllPosts();

    this.addPostForm = new FormGroup({
      image: new FormControl([]),
      content: new FormControl('', Validators.required),
    });
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
