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

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  userinfo!:any;
  title = '';
  app!: FirebaseApp;
  db!: Database;
  // form!: FormGroup;
  username = '';
  message = '';
  // chats: Chat[] = [];
  constructor(
    private chatService: ChatService,
    // private FormBuilder: FormBuilder
  ) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    // this.form = this.FormBuilder.group({
    //   message: [],
    //   username: [],
    // });
  }
  newMessage!: string;
  friends = [
    {
      profile_pic: 'assets/img/profile.jpg',
      id: 123124,
      name: 'John Doe',
    },
    {
      profile_pic: 'assets/img/profile.jpg',
      id: 124653124,
      name: 'Doe John',
    },
  ];
  msg :Chat[]=[];

  ngOnInit() {
    this.userinfo = JSON.parse(localStorage.getItem("user")!);
    console.log(this.userinfo);
    // this.chatService.getNewMessage().subscribe((message: any) => {
    //   this.msg.push(message);
    // });
    const chtasref = ref(this.db,'chats');
    onValue(chtasref,(snapshot:any) =>{
      const data = snapshot.data;
      for (let id in data){
        if(!this.msg.map(chat=>chat.id).includes(id)){
          this.msg.push(data[id]);
        }
      }
    })
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  sendMessage() {
    const timestamp = new Date().toString();
    // var send = { type: 'send', msg: this.newMessage };
    var send = { id: this.userinfo.uid, msg: this.newMessage, timeStamp:timestamp };
    set(ref(this.db, `chats/${this.userinfo.uid}`),send)
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
