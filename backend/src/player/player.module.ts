import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GbxModule} from '../gbx/gbx.module';
import {MessageModule} from '../message/message.module';
import {Player} from './player.entity';
import {PlayerService} from './player.service';

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
