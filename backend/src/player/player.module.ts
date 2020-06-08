import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UasecoPlayer} from '../dal/uaseco/uaseco-player.entity';
import {GbxModule} from '../gbx/gbx.module';
import {MessageModule} from '../message/message.module';
import {PlayerService} from './player.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UasecoPlayer
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
