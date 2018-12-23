import {SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets';
import {Observable, OperatorFunction} from 'rxjs';
import {GbxService} from '../gbx/gbx.service';
import {map} from 'rxjs/operators';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Map} from '../map/map.entity';
import {Record} from '../record/record.entity';
import {MapService} from '../map/map.service';
import {Player} from '../player/player.entity';
import {PlayerService} from '../player/player.service';
import {RecordService} from '../record/record.service';
import {Message} from '../message/message.entity';
import {MessageService} from '../message/message.service';

@WebSocketGateway()
export class AppGateway {

    private logger: Logger = log4js.getLogger();

    constructor(private gbxService: GbxService,
                private recordService: RecordService,
                private mapService: MapService,
                private playerService: PlayerService,
                private messageService: MessageService
    ) {}

    @SubscribeMessage('player/connect')
    subscribeToPlayerConnection(): Observable<WsResponse<Player>> {
        const event = 'player/connect';
        const mapPlayerToWsResponse: OperatorFunction<Player, WsResponse> = map((player: Player) => {
            const wsResponse: WsResponse = {
                event,
                data: player
            };
            return wsResponse;
        });
        return this.playerService.subscribeToPlayerConnection().pipe(mapPlayerToWsResponse);
    }

    @SubscribeMessage('player/disconnect')
    subscribeToPlayerDisconnection(): Observable<WsResponse<Player>> {
        const event = 'player/disconnect';
        const mapPlayerToWsResponse: OperatorFunction<Player, WsResponse> = map((player: Player) => {
            const wsResponse: WsResponse = {
                event,
                data: player
            };
            return wsResponse;
        });
        return this.playerService.subscribeToPlayerDisconnection().pipe(mapPlayerToWsResponse);
    }

    @SubscribeMessage('player/message')
    subscribeToPlayerMessage(): Observable<WsResponse<Message>> {
        const event = 'player/message';
        const mapGbxPlayerChatToWsResponse: OperatorFunction<Message, WsResponse> = map((message: Message) => {
            const wsResponse: WsResponse = {
                event,
                data: message
            };
            return wsResponse;
        });
        return this.playerService.subscribeToPlayerMessage().pipe(mapGbxPlayerChatToWsResponse);
    }

    @SubscribeMessage('map/change')
    subscribeToCurrentMap(): Observable<WsResponse<Map>> {
        const event = 'map/change';
        const mapMapToWsResponse: OperatorFunction<Map, WsResponse> = map((currentMap: Map) => {
            const wsResponse: WsResponse = {
                event,
                data: currentMap
            };
            return wsResponse;
        });
        return this.mapService.subscribeToMapChange().pipe(mapMapToWsResponse);
    }

    @SubscribeMessage('player/list')
    async getPlayerList(): Promise<Player[]> {
        return this.playerService.getPlayerList();
    }

    @SubscribeMessage('map/record/list')
    async getMapRecordList(client, data: any): Promise<Record[]> {
        return this.recordService.getRecordList(data.mapId);
    }

    @SubscribeMessage('message/list')
    async getMessageList(): Promise<Message[]> {
        return this.messageService.getMessageList();
    }

    @SubscribeMessage('map/current')
    async getCurrentMap(): Promise<Map> {
        return this.mapService.getCurrentMap();
    }

}
