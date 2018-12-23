import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AppGateway} from './app.gateway';
import {PlayerModule} from '../player/player.module';
import {GbxModule} from '../gbx/gbx.module';
import {RecordModule} from '../record/record.module';
import {MapModule} from '../map/map.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from 'nestjs-config';
import * as path from 'path';
import {MessageModule} from '../message/message.module';

@Module({
    controllers: [
        AppController
    ],
    providers: [
        AppGateway,
        AppService
    ],
    imports: [
        ConfigModule.load(path.resolve(__dirname, '../config/**/*.js')),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('database'),
            inject: [ConfigService]
        }),
        PlayerModule,
        GbxModule,
        RecordModule,
        MapModule,
        MessageModule
    ]
})

export class AppModule {}
