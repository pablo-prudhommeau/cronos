import {Module} from '@nestjs/common';
import {AppGateway} from './app.gateway';
import {PlayerModule} from '../player/player.module';
import {GbxModule} from '../gbx/gbx.module';
import {RecordModule} from '../record/record.module';
import {MapModule} from '../map/map.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MessageModule} from '../message/message.module';
import {ConfigModule} from '../config/config.module';
import {ConfigService} from '../config/config.service';
import {Player} from '../player/player.entity';
import {MapHistory} from '../gen/map-history.entity';
import {Playlist} from '../gen/playlist.entity';
import {Ranking} from '../gen/ranking.entity';
import {Setting} from '../gen/setting.entity';
import {Time} from '../gen/time.entity';
import {Rating} from '../gen/rating.entity';
import {Author} from '../map/author.entity';
import {Map} from '../map/map.entity';
import {Message} from '../message/message.entity';
import {Record} from '../record/record.entity';

@Module({
    controllers: [],
    providers: [
        AppGateway
    ],
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql' as 'mysql',
                host: configService.getString('DB_HOST'),
                port: 3306,
                username: configService.getString('DB_USERNAME'),
                password: configService.getString('DB_PASSWORD'),
                database: configService.getString('DB_NAME'),
                entities: [MapHistory, Playlist, Ranking, Rating, Setting, Time, Author, Map, Message, Player, Record],
                synchronize: false,
                charset: 'utf8mb4'
            })
        }),
        PlayerModule,
        GbxModule,
        RecordModule,
        MapModule,
        MessageModule
    ]
})

export class AppModule {}
