import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Observable} from 'rxjs';
import {Repository} from 'typeorm';
import {UasecoMap} from '../dal/uaseco/uaseco-map.entity';
import {GbxService} from '../gbx/gbx.service';
import {GbxMap} from '../gbx/structs/gbx-map';

@Injectable()
export class MapService {

    private logger: Logger = log4js.getLogger();

    constructor(
            @InjectRepository(UasecoMap) private readonly mapRepository: Repository<UasecoMap>,
            private readonly gbxService: GbxService
    ) {}

    subscribeToMapChange(): Observable<UasecoMap> {
        return new Observable<UasecoMap>(observer => {
            GbxService.beginMapSubject.subscribe(async (gbxMap: GbxMap) => {
                const fetchedMap: UasecoMap = await this.mapRepository.findOne({
                    relations: ['author'],
                    where: {
                        uid: gbxMap.UId
                    }
                });
                observer.next(fetchedMap);
            });
        });
    }

    getCurrentMap(): Promise<UasecoMap> {
        return new Promise<UasecoMap>(async resolve => {
            const gbxMap = await this.gbxService.getCurrentGbxMap();
            const fetchedMap: UasecoMap = await this.mapRepository.findOne({
                relations: ['author'],
                where: {
                    uid: gbxMap.UId
                }
            });
            resolve(fetchedMap);
        });
    }

}
