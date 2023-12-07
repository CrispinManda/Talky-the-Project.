// post-create-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
//import { YourPostService } from 'path-to-your-post-service'; // Import your post service

@Component({
  selector: 'app-post-create-modal',
  templateUrl: './post-create-modal.component.html',
  styleUrls: ['./post-create-modal.component.css']
})
export class PostCreateModalComponent implements OnInit {
  hidden=true
createPost() {
throw new Error('Method not implemented.');
}
  imageUrl: string = '';
  uploader: FileUploader = new FileUploader({
    url: 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload', // Replace with your Cloudinary upload URL
    method: 'POST',
    itemAlias: 'file',
    headers: [
      { name: 'X-Requested-With', value: 'XMLHttpRequest' },
    ]
  });

  postContent: string = '';
  taggedUsers: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: any) => {
      const result: any = JSON.parse(response);
      this.imageUrl = result.secure_url;
    };
  }

  onImageSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const file = (fileInput.files as FileList)[0];

  }

  showModal(): void {
    // Add logic to show the modal and overlay
    document.getElementById('crud-modal').classList.add('show');
    document.getElementById('crud-modal-overlay').classList.add('show');
  }

  hideModal(): void {
    // Add logic to hide the modal and overlay
    document.getElementById('crud-modal').classList.remove('show');
    document.getElementById('crud-modal-overlay').classList.remove('show');
  }


}
