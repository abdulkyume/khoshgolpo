import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-friendreq',
  templateUrl: './friendreq.component.html',
  styleUrls: ['./friendreq.component.css']
})
export class FriendreqComponent implements OnInit {
  userinfo: any;
  ausers: any;
  users!: any;
  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs.collection('addfriends').valueChanges().subscribe(userss => {
      this.ausers = userss;
      this.ausers = this.ausers.filter((user: any) => user.uid == this.userinfo.uid);
      var freq: any = [];
      for (var i = 0; i < this.ausers.length; i++) {
        freq.push(this.ausers[i].afduid);
      }
      this.afs.collection('users', ref => ref.where('uid', 'in', freq)).valueChanges().subscribe(ussers => {
        this.users = ussers;
      })
    });
  }

  delfriendreq(afdid: any) {
    this.userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs.doc(`addfriends/${afdid}`).delete();
  }
  accfriendreq(afdid:any){
    
  }
}
