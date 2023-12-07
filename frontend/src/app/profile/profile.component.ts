import { Component } from '@angular/core';
import * as cloudinary from 'cloudinary-core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileImage: string = 'https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg'; // Default image URL
  cloudinaryCore: any;

  constructor() {
    this.cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'YOUR_CLOUD_NAME' }); // Replace with your Cloudinary cloud name
  }

  handleImageUpload(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      const imageFile = target.files[0];
      this.uploadImageToCloudinary(imageFile);
    }
  }

  private uploadImageToCloudinary(image: File): void {
    const apiKey = 'YOUR_API_KEY'; // Replace with your Cloudinary API key
    const unsignedUploadPreset = 'YOUR_UNSIGNED_UPLOAD_PRESET'; // Replace with your Cloudinary unsigned upload preset
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload`; // Replace with your Cloudinary cloud name

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', unsignedUploadPreset);

    fetch(cloudinaryUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${apiKey}:`)}`
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        // Handle the Cloudinary response, e.g., save the returned URL
        this.profileImage = data.secure_url;
        console.log('Cloudinary Response:', data);
      })
      .catch(error => {
        console.error('Error uploading image to Cloudinary:', error);
      });
  }
}
