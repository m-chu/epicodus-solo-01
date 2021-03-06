import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Photo } from '../models/photo.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-user-photos-list',
  templateUrl: './user-photos-list.component.html',
  styleUrls: ['./user-photos-list.component.css'],
  providers: [PhotoService]
})

export class UserPhotosListComponent implements OnInit {
  savedPhotos: FirebaseListObservable<any[]> = null;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.savedPhotos = this.photoService.getPhotos();
  }

  deletePhoto(photo) {
    this.photoService.deletePhoto(photo);
    alert('This image has been deleted from your list of saved images.');
  }
}
