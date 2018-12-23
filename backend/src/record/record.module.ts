import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RecordService} from './record.service';
import {Record} from './record.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Record
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