import {Injectable} from '@nestjs/common';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import TelegramBot from 'node-telegram-bot-api';
import {Subject} from 'rxjs';
import {ConfigService} from '../config/config.service';
import {Player} from '../player/player.entity';

@Injectable()
export class TelegramService {

    public readonly telegramMessageSubject: Subject<String> = new Subject();

    public telegramBot: TelegramBot;

    private logger: Logger = log4js.getLogger();

    constructor(
            private readonly configService: ConfigService
    ) {
        const TelegramBot = require('node-telegram-bot-api');
        const token = this.configService.getString('TELEGRAM_BOT_TOKEN');
        this.telegramBot = new TelegramBot(token, {polling: true});
        this.telegramBot.onText(/(.+)/, (msg, match) => {
            this.logger.log(msg + ' - ' + match);
            const chatId = msg.chat.id;
            const resp = match[1];
            this.telegramMessageSubject.next(resp);
        });
    }

}
