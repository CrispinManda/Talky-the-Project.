import { Component } from '@angular/core';
import * as cloudinary from 'cloudinary-core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  profileImage: File | null = null;
  bio: string = '';
  gender: string = 'male';
  cloudinaryCore: any;
  Image: string = 'https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg'; // Default image URL
  constructor() {
    this.cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'YOUR_CLOUD_NAME' }); // Replace with your Cloudinary cloud name
  }

  handleImageUpload(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.profileImage = target.files[0];
    }
  }

  saveProfile(): void {
    // Add logic to upload the profile image to Cloudinary and save other profile details
    if (this.profileImage) {
      const formData = new FormData();
      formData.append('file', this.profileImage);
      formData.append('upload_preset', 'YOUR_UNSIGNED_UPLOAD_PRESET'); // Replace with your Cloudinary unsigned upload preset

      fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(result => {
          // Handle Cloudinary upload result
          console.log('Cloudinary Response:', result);
        })
        .catch(error => {
          // Handle Cloudinary upload error
          console.error('Error uploading image to Cloudinary:', error);
        });
    }

    // Add logic to save the bio and gender
    console.log('Bio:', this.bio);
    console.log('Gender:', this.gender);
  }
}
