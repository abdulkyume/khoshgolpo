import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-addfriends',
  templateUrl: './addfriends.component.html',
  styleUrls: ['./addfriends.component.css']
})
export class AddfriendsComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
  }
  addfriendreq(afdid:any){
    var userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs.collection('users').doc(userinfo.uid).set(
      {
        uid: userinfo.uid,
        afduid:afdid
      },
      { merge: true }
    );
  }

  delfriendreq(afdid:any){
    var userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs.collection('users').doc(userinfo.uid).set(
      {
        uid: userinfo.uid,
        afduid:afdid
      },
      { merge: true }
    );
  }

}
