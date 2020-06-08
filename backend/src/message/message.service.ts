import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Observable, Subject} from 'rxjs';
import {InsertResult, Repository} from 'typeorm';
import {AlyaMessage} from '../dal/alya/alya-message.entity';
import {GbxService} from '../gbx/gbx.service';

@Injectable()
export class MessageService {

    public readonly alyaMessageSubject: Subject<AlyaMessage> = new Subject();

    private logger: Logger = log4js.getLogger();

    constructor(
            private readonly gbxService: GbxService,
            @InjectRepository(AlyaMessage) private readonly messageRepository: Repository<AlyaMessage>
    ) {}

    async getMessageList(messageNumber: number): Promise<AlyaMessage[]> {
        return await this.messageRepository.find({
            relations: ['player'],
            take: messageNumber,
            order: {
                insertedOn: 'DESC'
            }
        });
    }

    async insert(message: AlyaMessage): Promise<InsertResult> {
        return await this.messageRepository.insert(message);
    }

    async getMessageById(messageId: number): Promise<AlyaMessage> {
        return await this.messageRepository.findOne({
            relations: ['player'],
            where: {
                messageId: messageId
            }
        });
    }

    subscribeToPlayerMessage(): Observable<AlyaMessage> {
        return new Observable<AlyaMessage>(observer => {
            this.alyaMessageSubject.subscribe((message: AlyaMessage) => {
                observer.next(message);
            });
        });
    }

}
