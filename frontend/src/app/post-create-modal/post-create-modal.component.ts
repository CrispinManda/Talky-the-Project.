// post-create-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { UploadService } from '../services/cloudinary/upload.service';
import { PostService } from '../services/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user-service.service';
//import { YourPostService } from 'path-to-your-post-service'; // Import your post service

@Component({
  selector: 'app-post-create-modal',
  templateUrl: './post-create-modal.component.html',
  styleUrls: ['./post-create-modal.component.css'],
})
export class PostCreateModalComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  imageUrl: string;
  addPostForm: FormGroup;
  files: any[] = [];
  showReply: boolean = false;
  hidden: boolean = true;

  constructor(
    private upload: UploadService,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.loadPeopleYouMayKnow();
    this.loadAllPosts();

    this.addPostForm = new FormGroup({
      image: new FormControl[''],
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

  onSelectPostImage(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  if (this.files){
    const data = new FormData();
    const file_data = this.files;
    data.append('file', file_data [0]);
    data.append('upload_preset', 'km8t69am');
    data.append('cloud_name', 'dptnbnpoq');


    this.upload.uploadImage(data).subscribe((res)=>{
      console.log(res.secure_url);
      this.imageUrl = res.secure_url
    })
  }

  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  toggleReply() {
    this.showReply = true;
  }

  newPost() {
    console.log(this.addPostForm.value);
    this.addPostForm.value.image = this.files;

    if (this.addPostForm.valid) {
      // const imageUrls: string[] = [];

      // if (this.files.length === 0 && !this.addPostForm.value.content) {
      //   console.log('Either an image or content is required.');
      //   return;
      // }

      // Upload all images


         const postDetails = {
           image: this.imageUrl,
           postcontent: this.addPostForm.value.content,
           UserId: '',
         };

         this.postService.createPost(postDetails).subscribe(
           (response) => {
             console.log('Post created successfully:', response);
           },
           (error) => {
             console.error('Error creating post:', error);
           }
         );
          
      // for (let index = 0; index < this.files.length; index++) {
       

       

      //     // if (imageUrls.length === this.files.length) {
         
        
      // }
    } else {
      console.log('Data is not valid');
    }
  }
}