import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  constructor(private chatService: ChatService) {}
  newMessage!: string;
  friends = [
    {
      profile_pic:'assets/img/profile.jpg',
      id : 123124,
      name: 'John Doe',
    },
    {
      profile_pic:'assets/img/profile.jpg',
      id : 124653124,
      name: 'Doe John',
    }
  ];
  msg = [
    {
      type: 'send',
      msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      type: 'receive',
      msg: 'Delectus nulla ullam labore, tempore unde perspiciatis qui veniam natus libero minus animi reprehenderit officiis accusantium culpa earum necessitatibus doloremque consequuntur aut id placeat, aliquid nobis nam?',
    },
    {
      type: 'send',
      msg: 'Temporibus ipsam consequatur eius quae, nisi deserunt voluptatem veritatis minus ratione cum eos obcaecati iste.',
    },
    {
      type: 'receive',
      msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      type: 'send',
      msg: 'Delectus nulla ullam labore, tempore unde perspiciatis qui veniam natus libero minus animi reprehenderit officiis accusantium culpa earum necessitatibus doloremque consequuntur aut id placeat, aliquid nobis nam?',
    },
    {
      type: 'receive',
      msg: 'Temporibus ipsam consequatur eius quae, nisi deserunt voluptatem veritatis minus ratione cum eos obcaecati iste.',
    },
    {
      type: 'send',
      msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      type: 'receive',
      msg: 'Temporibus ipsam consequatur eius quae, nisi deserunt voluptatem veritatis minus ratione cum eos obcaecati iste.',
    },
    {
      type: 'receive',
      msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ];

  ngOnInit() {
    this.chatService.getNewMessage().subscribe((message:any) =>{
      this.msg.push(message);
    });
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  sendMessage() {
    var send = { type: 'send', msg: this.newMessage };
    this.chatService.sendMessage(send);
    this.newMessage = '';
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  showfriendmsg(val:any) {
    console.log(val)
  }
}
