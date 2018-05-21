import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private user;

  constructor(public userService: UserService, private router: Router) {
    this.userService.user.subscribe(user => {
      this.user = user;
    });
  }
}
