import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-addfriends',
  templateUrl: './addfriends.component.html',
  styleUrls: ['./addfriends.component.css'],
})
export class AddfriendsComponent implements OnInit {
  users: any;
  ausers: any[] = [];
  userinfo: any;
  freqsearch: any;
  freq: any = [];
  constructor(private afs: AngularFirestore, private AuthService:AuthService) {}

  ngOnInit(): void {
    var userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs
      .collection('addfriends')
      .valueChanges()
      .subscribe((userss) => {
        var exlude: any = [];
        exlude.push(userinfo.uid);
        this.ausers = userss;
        this.users = this.ausers.filter((user) => user.uid == userinfo.uid);
        for (var i = 0; i < this.users.length; i++) {
          exlude.push(this.users[i].afduid);
        }
        this.afs
          .collection('users', (ref) => ref.where('uid', 'not-in', exlude))
          .valueChanges()
          .subscribe((ussers) => {
            this.users = ussers;
          });
      });
    this.afs
      .collection('users')
      .valueChanges()
      .subscribe((userss) => {
        this.ausers = userss;
        this.users = this.ausers.filter((user) => user.uid != userinfo.uid);
      });
  }
  addfriendreq(afdid: any) {
    var userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs
      .collection('addfriends')
      .doc(userinfo.uid + afdid)
      .set(
        {
          uid: userinfo.uid,
          afduid: afdid,
        },
        { merge: true }
      );

    
    this.freq.push(userinfo.uid);
    this.freq.push(afdid);
    this.afs
      .collection('users', (ref) => ref.where('uid', 'not-in', this.freq))
      .valueChanges()
      .subscribe((ussers) => {
        this.users = ussers;
      });
  }

  searchfriendreq() {
    if (this.freqsearch.length < 0) {
      this.users = this.ausers;
    } else {
      this.users = this.ausers
        .filter((user) => user.uid != this.userinfo.uid)
        .filter((user) =>
          user.name.toLowerCase().includes(this.freqsearch.toLowerCase())
        );
    }
  }
  logout(){
    this.AuthService.SignOut();
  }
}
