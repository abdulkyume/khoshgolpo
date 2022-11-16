import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  userinfo: any;

  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.userinfo = JSON.parse(localStorage.getItem('user')!);
    console.log(this.getfriends());
  }

  getfriends() {
    return new Promise<any>((resolve) => {
      this.db
        .collection('friends')
        .valueChanges({ uid: this.userinfo.uid })
        .subscribe((users) => resolve(users));
    });
  }
}
