import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-allfriends',
  templateUrl: './allfriends.component.html',
  styleUrls: ['./allfriends.component.css']
})
export class AllfriendsComponent implements OnInit {
  userinfo: any;
  ausers:any;
  users:any;
  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs.collection('friends').valueChanges().subscribe(userss => {
      this.ausers =userss;
      this.users =this.ausers.filter((user:any) => user.uid!=this.userinfo.uid);
    });
  }

  delfriend(afdid:any){
    this.userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs.doc(`friends/${afdid}`).delete();
  }
}
