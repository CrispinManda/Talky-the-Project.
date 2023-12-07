import { Component } from '@angular/core';
import * as cloudinary from 'cloudinary-core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  postContent: string = '';
  selectedImage: File | null = null;

  onContentChange(content: string): void {
    this.postContent = content;
  }

  onImageSelect(event: Event): void {
    const target = (event.target as HTMLInputElement);

    if (target?.files && target.files.length > 0) {
      this.selectedImage = target.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedImage) {
      this.uploadImageToCloudinary(this.selectedImage);
    }

    
    console.log('Post Content:', this.postContent);
    
  }

  private uploadImageToCloudinary(image: File): void {
    const cloudName = 'talky'; 
    const apiKey = 'dptnbpoq'; 
    const unsignedUploadPreset = 'talky'; 
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', unsignedUploadPreset);

    fetch(cloudinaryUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${btoa(`${apiKey}:`)}` // Include API key in headers
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the Cloudinary response, e.g., save the returned URL
        console.log('Cloudinary Response:', data);
    })
    .catch(error => {
        console.error('Error uploading image to Cloudinary:', error);
    });
}
}