import {Injectable} from '@nestjs/common';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Subject} from 'rxjs';
import {ConfigService} from '../config/config.service';
import {GbxService} from '../gbx/gbx.service';
import {Message} from '../message/message.entity';
import {MessageService} from '../message/message.service';
import {Player} from '../player/player.entity';
import {PlayerService} from '../player/player.service';
import {TelegramService} from '../telegram/telegram.service';

@Injectable()
export class AppService {

    public readonly playerMessageSubject: Subject<Message> = new Subject();

    private logger: Logger = log4js.getLogger();
    private MPStyle = require('zocka-maniaplanet-formatter');

    constructor(
            private readonly gbxService: GbxService,
            private readonly messageService: MessageService,
            private readonly playerService: PlayerService,
            private readonly configService: ConfigService,
            private readonly telegramService: TelegramService
    ) {
        this.playerService.subscribeToPlayerConnection().subscribe((player: Player) => {
            this.telegramService.telegramBot.sendMessage(
                    this.configService.getString('TELEGRAM_BOT_CHAT_ID'),
                    '<b>' + this.MPStyle(player.nickname, {stripTags: 'color'}) + '</b> <i>is now connected</i> \u{1F603}',
                    {'parse_mode': 'HTML'});
        });

        this.playerService.subscribeToPlayerDisconnection().subscribe((player: Player) => {
            this.telegramService.telegramBot.sendMessage(
                    this.configService.getString('TELEGRAM_BOT_CHAT_ID'),
                    '<b>' + this.MPStyle(player.nickname, {stripTags: 'color'}) + '</b> <i>is now disconnected</i> \u{1F622}',
                    {'parse_mode': 'HTML'});
        });

        this.telegramService.telegramMessageSubject.subscribe((message: string) => {
            this.sendMessageAsConsole(message);
        });

        this.playerService.subscribeToPlayerMessage().subscribe((message: Message) => {
            if (message.player !== null) {
                this.telegramService.telegramBot.sendMessage(
                        this.configService.getString('TELEGRAM_BOT_CHAT_ID'),
                        '<b>' + this.MPStyle(message.player.nickname, {stripTags: 'color'}) + '</b> : ' + message.message,
                        {'parse_mode': 'HTML'});
            }
        });
    }

    async sendMessageAsConsole(messageText: string) {
        const messageFormattedAsConsoleMessage = '$c06◎ Message from console > $g ' + messageText;
        await this.gbxService.sendMessage(messageFormattedAsConsoleMessage);
        const message = new Message();
        message.message = messageFormattedAsConsoleMessage;
        message.player = null;
        await this.messageService.insert(message);
        this.playerService.playerMessageSubject.next(message);
    }

}
