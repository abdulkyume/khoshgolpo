import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { environment } from '../../environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue } from 'firebase/database';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
// import { Chat } from '../chat';
import { Chat } from './../Chat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  ausers: any;
  users: any;
  userinfo!: any;
  username = '';
  receiverid: any;
  message = '';
  friendid: any;
  newMessage!: string;
  msg: Chat[] = [];
  hide = false;

  constructor(private afs: AngularFirestore, private AuthService:AuthService) {}

  ngOnInit() {
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
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  sendMessage(val: any) {
    this.userinfo = JSON.parse(localStorage.getItem('user')!);
    const timestamp = new Date().toString();
    var send = {
      suid: this.userinfo.uid,
      ruid: this.friendid,
      username: this.userinfo.displayName,
      message: this.newMessage,
      timeStamp: timestamp,
      type: 'send',
    };
    this.afs
      .collection('chats')
      .doc(this.userinfo.uid + '-' + val + '-' + timestamp)
      .set(send)
      .then(() => {
        this.newMessage = '';
      });
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  showfriendmsg(val: any) {
    
    this.receiverid = val;
    this.hide = true;
    var name = this.users.filter((user: any) => user.uid == val);
    this.friendid = name[0].uid;
    var name = name[0].username;
    this.username = name;
    this.userinfo = JSON.parse(localStorage.getItem('user')!);
    this.geallmsg();
  }
  geallmsg() {
    this.userinfo = JSON.parse(localStorage.getItem('user')!);
    var smsg: any;
    var rmsg: any;
    this.afs
      .collection('chats')
      .valueChanges()
      .subscribe((ussers) => {
        smsg = ussers;
        rmsg = ussers;
        smsg = smsg.filter(
          (msg: any) =>
            msg.suid == this.userinfo.uid && msg.ruid == this.receiverid
        );
        rmsg = rmsg.filter(
          (msg: any) =>
            msg.ruid == this.userinfo.uid && msg.suid == this.receiverid
        );
        var arr3 = [...smsg, ...rmsg];
        arr3.sort(function (a: any, b: any) {
          var c: any = new Date(b.timeStamp);
          var d: any = new Date(a.timeStamp);
          return c - d;
        });
        arr3.reverse();
        
        this.msg = [];
        for (var i = 0; i < arr3.length; i++) {
          this.msg.push(arr3[i]);
        }
      });
  }
  logout(){
    this.AuthService.SignOut();
  }
}
