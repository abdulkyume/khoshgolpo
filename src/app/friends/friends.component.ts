import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  userinfo: any;
  ausers: any;
  users: any;
  constructor(private afs: AngularFirestore,private AuthService:AuthService) {}

  ngOnInit(): void {
  }

  delfriend(afdid: any) {
    this.userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs.doc(`friends/${afdid}`).delete();
  }
  logout(){
    this.AuthService.SignOut();
  }
}
