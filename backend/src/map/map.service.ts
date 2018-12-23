import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Map} from './map.entity';
import {Repository} from 'typeorm';
import {Observable} from 'rxjs';
import {GbxService} from '../gbx/gbx.service';
import {GbxMap} from '../gbx/gbx.map';

@Injectable()
export class MapService {

    private logger: Logger = log4js.getLogger();

    constructor(
        @InjectRepository(Map) private readonly mapRepository: Repository<Map>,
        private readonly gbxService: GbxService
    ) {}

    subscribeToMapChange(): Observable<Map> {
        return new Observable<Map>(observer => {
            GbxService.beginMapSubject.subscribe(async (gbxMap: GbxMap) => {
                const fetchedMap: Map = await this.mapRepository.findOne({
                    relations: ['author'],
                    where: {
                        uid: gbxMap.UId
                    }
                });
                observer.next(fetchedMap);
            });
        });
    }

    getCurrentMap(): Promise<Map> {
        return new Promise<Map>(async resolve => {
            const gbxMap = await this.gbxService.getCurrentGbxMap();
            const fetchedMap: Map = await this.mapRepository.findOne({
                relations: ['author'],
                where: {
                    uid: gbxMap.UId
                }
            });
            resolve(fetchedMap);
        });
    }

}
