import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from '../service/message/message.service';
import {Message} from './Message';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
    public messages: Message[];
    private subscription: Subscription;

    constructor(
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.subscription = this.messageService.getMessageObservable().subscribe(messages => {
            this.messages = messages;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    close(index: number) {
        this.messageService.closeMessage(index);
    }
}


