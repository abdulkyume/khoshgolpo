import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable()
export class ChatService {
  constructor() {}
  public message$: BehaviorSubject<object> = new BehaviorSubject({});
  socket: any = io('http://localhost:3000');

  public sendMessage(message:any) {
    this.socket.emit('send', message);
  }
  public getNewMessage = () => {
    this.socket.on('send', (message:any) => {
      this.message$.next(message);
    });
    this.socket.on('receive', (message:any) => {
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };
}
