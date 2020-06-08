import {Injectable} from '@nestjs/common';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {ConfigService} from '../config/config.service';
import {AlyaMessage} from '../dal/alya/alya-message.entity';
import {UasecoPlayer} from '../dal/uaseco/uaseco-player.entity';
import {GbxService} from '../gbx/gbx.service';
import {MessageService} from '../message/message.service';
import {PlayerService} from '../player/player.service';
import {TelegramService} from '../telegram/telegram.service';

@Injectable()
export class AppService {

    private logger: Logger = log4js.getLogger();
    private MPStyle = require('zocka-maniaplanet-formatter');

    constructor(
            private readonly gbxService: GbxService,
            private readonly messageService: MessageService,
            private readonly playerService: PlayerService,
            private readonly configService: ConfigService,
            private readonly telegramService: TelegramService
    ) {
        this.playerService.subscribeToPlayerConnection().subscribe((player: UasecoPlayer) => {
            this.telegramService.telegramBot.sendMessage(
                    this.configService.getString('TELEGRAM_BOT_CHAT_ID'),
                    '<b>' + this.MPStyle(player.nickname, {stripTags: 'color'}) + '</b> <i>is now connected</i> \u{1F603}',
                    {'parse_mode': 'HTML'});
        });

        this.playerService.subscribeToPlayerDisconnection().subscribe((player: UasecoPlayer) => {
            this.telegramService.telegramBot.sendMessage(
                    this.configService.getString('TELEGRAM_BOT_CHAT_ID'),
                    '<b>' + this.MPStyle(player.nickname, {stripTags: 'color'}) + '</b> <i>is now disconnected</i> \u{1F622}',
                    {'parse_mode': 'HTML'});
        });

        this.telegramService.telegramMessageSubject.subscribe((message: string) => {
            this.sendMessageAsConsole(message);
        });

        this.messageService.subscribeToPlayerMessage().subscribe((message: AlyaMessage) => {
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
        const alyaMessage = new AlyaMessage();
        alyaMessage.message = messageFormattedAsConsoleMessage;
        alyaMessage.player = null;
        await this.messageService.insert(alyaMessage);
        this.messageService.alyaMessageSubject.next(alyaMessage);
    }

}
