import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-allfriends',
  templateUrl: './allfriends.component.html',
  styleUrls: ['./allfriends.component.css'],
})
export class AllfriendsComponent implements OnInit {
  userinfo: any;
  ausers: any;
  users: any;
  constructor(private afs: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.userinfo = localStorage.getItem('user')!;
    if (this.userinfo) {
      this.router.navigate(['login']);
    } else {
      this.userinfo = JSON.parse(localStorage.getItem('user')!);
      this.afs
        .collection('firends')
        .valueChanges()
        .subscribe((userss) => {
          var includ: any = [];
          this.ausers = userss;
          this.ausers = this.ausers.filter(
            (user: any) => user.uid == this.userinfo.uid
          );
          for (var i = 0; i < this.ausers.length; i++) {
            includ.push(this.ausers[i].fuid);
          }
          if (includ.length > 0) {
            this.afs
              .collection('users', (ref) => ref.where('uid', 'in', includ))
              .valueChanges()
              .subscribe((ussers) => {
                this.users = ussers;
              });
          }
        });
    }
  }

  delfriend(afdid: any) {
    this.userinfo = JSON.parse(localStorage.getItem('user')!);
    this.afs
      .collection('firends')
      .doc(`${this.userinfo.uid + afdid}`)
      .delete()
      .then(() => console.log('deleted'))
      .catch((err) => console.log('Error!', err));
    this.ngOnInit();
  }
}
