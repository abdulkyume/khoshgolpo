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
  title = '';
  app!: FirebaseApp;
  db!: Database;
  // form!: FormGroup;
  username = '';
  message = '';
  constructor(private afs: AngularFirestore) {}
  newMessage!: string;
  msg: Chat[] = [];

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
  sendMessage() {
    const timestamp = new Date().toString();
    // var send = { type: 'send', msg: this.newMessage };
    var send = {
      id: this.userinfo.uid,
      msg: this.newMessage,
      timeStamp: timestamp,
    };
    set(ref(this.db, `chats/${this.userinfo.uid}`), send);
    // this.chatService.sendMessage(send);
    this.newMessage = '';
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  showfriendmsg(val: any) {
    console.log(val);
  }
}
