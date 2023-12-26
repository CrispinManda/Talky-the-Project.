import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-id',
  templateUrl: './profil-id.component.html',
  styleUrls: ['./profil-id.component.css'],
})
export class ProfilIdComponent {
  handleImageUpload($event: Event) {
    throw new Error('Method not implemented.');
  }
  profileImage: string =
    'https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg';
}
