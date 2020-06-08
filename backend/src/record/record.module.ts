import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UasecoRecord} from '../dal/uaseco/uaseco-record.entity';
import {RecordService} from './record.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UasecoRecord
        ])
    ],
    providers: [
        RecordService
    ],
    exports: [
        RecordService
    ]
})
export class RecordModule {}