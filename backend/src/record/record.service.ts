import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Repository} from 'typeorm';
import {Record} from './record.entity';

@Injectable()
export class RecordService {

    private logger: Logger = log4js.getLogger();

    constructor(
        @InjectRepository(Record) private recordRepository: Repository<Record>
    ) {}

    async getRecordList(mapId: string): Promise<Record[]> {
        const recordList = await this.recordRepository.find({
            relations: ['map', 'player'],
            where: {
                map: {
                    mapId
                }
            }
        });
        return recordList;
    }

}
