import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MapService} from './map.service';
import {Map} from './map.entity';
import {GbxModule} from '../gbx/gbx.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Map
        ]),
        GbxModule
    ],
    providers: [
        MapService
    ],
    exports: [
        MapService
    ]
})
export class MapModule {}
