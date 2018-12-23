import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Message} from './message.entity';
import {Repository} from 'typeorm';

@Injectable()
export class MessageService {

    private logger: Logger = log4js.getLogger();

    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>
    ) {}

    async getMessageList(): Promise<Message[]> {
        return await this.messageRepository.find({
            relations: ['player']
        });
    }

    async insert(message: Message) {
        return await this.messageRepository.insert(message);
    }

}
