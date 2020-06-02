import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GbxModule} from '../gbx/gbx.module';
import {Message} from './message.entity';
import {MessageService} from './message.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Message
        ]),
        GbxModule
    ],
    providers: [
        MessageService
    ],
    exports: [
        MessageService
    ]
})
export class MessageModule {}