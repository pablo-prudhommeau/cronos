import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {InsertResult, Repository} from 'typeorm';
import {GbxService} from '../gbx/gbx.service';
import {Message} from './message.entity';

@Injectable()
export class MessageService {

    private logger: Logger = log4js.getLogger();

    constructor(
            private readonly gbxService: GbxService,
            @InjectRepository(Message) private readonly messageRepository: Repository<Message>
    ) {}

    async getMessageList(messageNumber: number): Promise<Message[]> {
        return await this.messageRepository.find({
            relations: ['player'],
            take: messageNumber,
            order: {
                insertedOn: 'DESC'
            }
        });
    }

    async insert(message: Message): Promise<InsertResult> {
        return await this.messageRepository.insert(message);
    }

    async getMessageById(messageId: number): Promise<Message> {
        return await this.messageRepository.findOne({
            relations: ['player'],
            where: {
                messageId: messageId
            }
        });
    }

}
