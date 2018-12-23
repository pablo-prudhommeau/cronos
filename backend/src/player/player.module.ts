import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PlayerService} from './player.service';
import {Player} from './player.entity';
import {GbxModule} from '../gbx/gbx.module';
import {MessageModule} from '../message/message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Player
        ]),
        GbxModule,
        MessageModule
    ],
    providers: [
        PlayerService
    ],
    exports: [
        PlayerService
    ]
})
export class PlayerModule {}
