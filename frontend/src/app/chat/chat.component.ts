import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Message} from '../../gbx/message';
import {GbxService} from '../../gbx/gbx.service';
import {MessageForm} from './message-form';

declare var MPStyle: any;

@Component({
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.scss'],
})
export class ChatComponent implements OnInit {

    messageForm = new MessageForm();
    messageList: Message[] = [];

    constructor(private gbxService: GbxService) {}

    @ViewChildren('chatMessage') chatMessageList: QueryList<any>;

    ngOnInit() {
        this.gbxService.connect().then(() => {
            this.initializeDashboardData();
        });
    }

    initializeDashboardData() {
        this.gbxService.getMessageList(50).then((messageList: Message[]) => {
            this.messageList = messageList;

            this.gbxService.subscribeToPlayerMessage().subscribe((message: Message) => {
                this.messageList.unshift(message);
            });

            this.chatMessageList.changes.subscribe(changes => {
                changes.last.nativeElement.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'});
            });
        });
    }

    onNgSubmit(): void {
        const messageForm = this.messageForm;
        if (messageForm.message !== '') {
            const message = messageForm.message;
            this.gbxService.sendMessage(message).then(() => {
                messageForm.message = '';
            });
        }
    }

}
