import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from '../services/cloudinary/upload.service';



import { PostService } from '../services/post.service';

// import { postBody } from '../interface/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  addPostForm!: FormGroup;
  files: any[] = [];
 
  allPosts: any[] = [];

  isFormVisible: boolean = false;
  isUpdateFormVisible: boolean = false;
  showReply: boolean = false;
  iseditCommentVisible: boolean = false;
  editedCommentText: string = '';
  currentComment: any;
  newcommentText: string = '';
  postLikeCount = 0;

  ngOnInit() {
 
  }

  constructor(
    private upload: UploadService,
  
    private postService: PostService
  ) {
    this.addPostForm = new FormGroup({
      image: new FormControl([]),
      content: new FormControl('', Validators.required),
    });

    // if (this.storedUser) {
    //   const user = JSON.parse(this.storedUser);
    //   this.userID = user.userID;
    // } else {
    //   console.error('User details not found in local storage');
    // }
  }

  onSelectPostImage(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  viewForm() {
    // this.addPost = true;
    this.isFormVisible = true;
  }
  hideform() {
    this.isFormVisible = false;
    this.isUpdateFormVisible = false;
  }

  // newPost() {}
  toggleReply() {
    this.showReply = true;
  }
  //CREATE POST
  newPost() {
    // Your logic to share the post
    console.log(this.addPostForm.value);
    this.addPostForm.value.image = this.files;

    if (this.addPostForm.valid) {
      const imageUrls: string[] = [];

      if (this.files.length == 0 && !this.addPostForm.value.content) {
        console.log('Either an image or content is required.');
        return;
      }

      // Upload all images
      for (let index = 0; index < this.files.length; index++) {
        const data = new FormData();
        const file_data = this.files[index];
        data.append('file', file_data);
        data.append('upload_preset', 'x1zwskyt');
        data.append('cloud_name', 'dg5qb7ntu');

        console.log('data is ', data);


        this.upload.uploadImage(data).subscribe((res) => {
          imageUrls.push(res.secure_url);

          // Check if all images are uploaded before making the post request
          if (imageUrls.length === this.files.length) {
            const postDetails = {
              imageUrl: imageUrls.join(','), // Assuming you want to concatenate image URLs
              postContent: this.addPostForm.value.content,
              userID: '', // You may need to get the user ID from your authentication service
            };

  
          }
        });
      }
    } else {
      console.log('dat is not valid');
    }
  }



}
