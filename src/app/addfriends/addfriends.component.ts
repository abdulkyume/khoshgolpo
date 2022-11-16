import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-addfriends',
  templateUrl: './addfriends.component.html',
  styleUrls: ['./addfriends.component.css']
})
export class AddfriendsComponent implements OnInit {
  users:any[]=[];
  ausers:any[]=[];
  userinfo:any;
  freqsearch:any;
  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    var userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs.collection('users').valueChanges().subscribe(userss => {
      this.ausers =userss;
      this.users =this.ausers.filter(user => user.uid!=userinfo.uid);
    });
  }
  addfriendreq(afdid:any){
    var userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs.collection('addfriends').doc(userinfo.uid).set(
      {
        uid: userinfo.uid,
        afduid:afdid
      },
      { merge: true }
    );
  }

  searchfriendreq(){
    if(this.freqsearch.length <0){
      this.users = this.ausers;
    }
    else{
      this.users = this.ausers.filter(user => user.uid!=this.userinfo.uid).filter(user => user.name.toLowerCase().includes(this.freqsearch.toLowerCase()));
    }
  }

}
