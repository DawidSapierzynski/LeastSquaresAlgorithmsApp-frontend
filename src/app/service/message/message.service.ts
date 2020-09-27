import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message} from '../../message/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];
  private messageBS = new Subject<Message[]>();

  constructor() {
  }

  sendMessage(message: Message) {
    this.messages.push(message);
    this.messageBS.next(this.messages);
  }

  closeMessage(index: number) {
    this.messages.splice(index, 1);
    this.messageBS.next(this.messages);
  }

  clearMessage() {
    this.messages = [];
    this.messageBS.next(this.messages);
  }

  getMessageObservable(): Observable<Message[]> {
    return this.messageBS.asObservable();
  }
}
