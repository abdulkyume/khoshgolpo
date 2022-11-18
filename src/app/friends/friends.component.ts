import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  userinfo: any;
  ausers: any;
  users: any;
  constructor(private router:Router,private AuthService:AuthService) {}

  ngOnInit(): void {
    this.userinfo = localStorage.getItem('user')!;
    if (this.userinfo) {
      this.router.navigate(['login']);
    }
  }
  logout(){
    this.AuthService.SignOut();
  }
}
