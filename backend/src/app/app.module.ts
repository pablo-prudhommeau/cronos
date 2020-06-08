import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '../config/config.module';
import {ConfigService} from '../config/config.service';
import {AlyaMessage} from '../dal/alya/alya-message.entity';
import {UasecoAuthor} from '../dal/uaseco/uaseco-author.entity';
import {UasecoMapHistory} from '../dal/uaseco/uaseco-map-history.entity';
import {UasecoMap} from '../dal/uaseco/uaseco-map.entity';
import {UasecoPlayer} from '../dal/uaseco/uaseco-player.entity';
import {UasecoPlaylist} from '../dal/uaseco/uaseco-playlist.entity';
import {UasecoRanking} from '../dal/uaseco/uaseco-ranking.entity';
import {UasecoRating} from '../dal/uaseco/uaseco-rating.entity';
import {UasecoRecord} from '../dal/uaseco/uaseco-record.entity';
import {UasecoSetting} from '../dal/uaseco/uaseco-setting.entity';
import {UasecoTime} from '../dal/uaseco/uaseco-time.entity';
import {GbxModule} from '../gbx/gbx.module';
import {MapModule} from '../map/map.module';
import {MessageModule} from '../message/message.module';
import {PlayerModule} from '../player/player.module';
import {RecordModule} from '../record/record.module';
import {TelegramModule} from '../telegram/telegram.module';
import {AppController} from './app.controller';
import {AppGateway} from './app.gateway';
import {AppService} from './app.service';

@Module({
    controllers: [
        AppController
    ],
    providers: [
        AppGateway,
        AppService
    ],
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql' as 'mysql',
                host: configService.getString('DB_HOST'),
                port: configService.getNumber('DB_PORT'),
                username: configService.getString('DB_USERNAME'),
                password: configService.getString('DB_PASSWORD'),
                database: configService.getString('DB_NAME'),
                entities: [UasecoMapHistory, UasecoPlaylist, UasecoRanking, UasecoRating, UasecoSetting, UasecoTime, UasecoAuthor, UasecoMap, AlyaMessage, UasecoPlayer, UasecoRecord],
                synchronize: false,
                charset: 'utf8mb4'
            })
        }),
        PlayerModule,
        MessageModule,
        GbxModule,
        RecordModule,
        MapModule,
        TelegramModule
    ]
})

export class AppModule {}
