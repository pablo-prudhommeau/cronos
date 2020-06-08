import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Repository} from 'typeorm';
import {UasecoRecord} from '../dal/uaseco/uaseco-record.entity';

@Injectable()
export class RecordService {

    private logger: Logger = log4js.getLogger();

    constructor(
            @InjectRepository(UasecoRecord) private recordRepository: Repository<UasecoRecord>
    ) {}

    async getRecordList(mapId: string): Promise<UasecoRecord[]> {
        return await this.recordRepository.find({
            relations: ['map', 'player'],
            where: {
                map: {
                    mapId
                }
            }
        });
    }

}
