import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AlyaMessage} from '../dal/alya/alya-message.entity';
import {GbxModule} from '../gbx/gbx.module';
import {MessageService} from './message.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AlyaMessage
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