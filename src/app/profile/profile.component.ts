import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private AuthService: AuthService, private router: Router) {}
  userinfo: any;

  ngOnInit(): void {
    console.log('here')
    this.userinfo = localStorage.getItem('user')!;
    this.userinfo = JSON.parse(this.userinfo);
      document
        .getElementById('userpic')!
        .setAttribute('src', this.userinfo.photoURL);
    // z
  }
  logout() {
    this.AuthService.SignOut();
  }
}
