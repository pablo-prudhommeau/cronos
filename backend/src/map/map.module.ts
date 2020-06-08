import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UasecoMap} from '../dal/uaseco/uaseco-map.entity';
import {GbxModule} from '../gbx/gbx.module';
import {MapService} from './map.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UasecoMap
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
