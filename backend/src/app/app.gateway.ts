import {SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Observable, OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';
import {AlyaMessage} from '../dal/alya/alya-message.entity';
import {UasecoMap} from '../dal/uaseco/uaseco-map.entity';
import {UasecoPlayer} from '../dal/uaseco/uaseco-player.entity';
import {UasecoRecord} from '../dal/uaseco/uaseco-record.entity';
import {GbxService} from '../gbx/gbx.service';
import {MapService} from '../map/map.service';
import {MessageService} from '../message/message.service';
import {PlayerService} from '../player/player.service';
import {RecordService} from '../record/record.service';
import {AppService} from './app.service';

@WebSocketGateway({path: '/ws'})
export class AppGateway {

    private logger: Logger = log4js.getLogger();

    constructor(
            private gbxService: GbxService,
            private recordService: RecordService,
            private mapService: MapService,
            private playerService: PlayerService,
            private messageService: MessageService,
            private appService: AppService
    ) {}

    @SubscribeMessage('player/connect')
    subscribeToPlayerConnection(): Observable<WsResponse<UasecoPlayer>> {
        const event = 'player/connect';
        const mapPlayerToWsResponse: OperatorFunction<UasecoPlayer, WsResponse> = map((player: UasecoPlayer) => {
            const wsResponse: WsResponse = {
                event,
                data: player
            };
            return wsResponse;
        });
        return this.playerService.subscribeToPlayerConnection().pipe(mapPlayerToWsResponse);
    }

    @SubscribeMessage('player/disconnect')
    subscribeToPlayerDisconnection(): Observable<WsResponse<UasecoPlayer>> {
        const event = 'player/disconnect';
        const mapPlayerToWsResponse: OperatorFunction<UasecoPlayer, WsResponse> = map((player: UasecoPlayer) => {
            const wsResponse: WsResponse = {
                event,
                data: player
            };
            return wsResponse;
        });
        return this.playerService.subscribeToPlayerDisconnection().pipe(mapPlayerToWsResponse);
    }

    @SubscribeMessage('player/message')
    subscribeToPlayerMessage(): Observable<WsResponse<AlyaMessage>> {
        const event = 'player/message';
        const mapGbxPlayerChatToWsResponse: OperatorFunction<AlyaMessage, WsResponse> = map((message: AlyaMessage) => {
            const wsResponse: WsResponse = {
                event,
                data: message
            };
            return wsResponse;
        });
        return this.messageService.subscribeToPlayerMessage().pipe(mapGbxPlayerChatToWsResponse);
    }

    @SubscribeMessage('map/change')
    subscribeToCurrentMap(): Observable<WsResponse<UasecoMap>> {
        const event = 'map/change';
        const mapMapToWsResponse: OperatorFunction<UasecoMap, WsResponse> = map((currentMap: UasecoMap) => {
            const wsResponse: WsResponse = {
                event,
                data: currentMap
            };
            return wsResponse;
        });
        return this.mapService.subscribeToMapChange().pipe(mapMapToWsResponse);
    }

    @SubscribeMessage('player/list')
    async getPlayerList(): Promise<UasecoPlayer[]> {
        return this.playerService.getPlayerList();
    }

    @SubscribeMessage('player/online/list')
    async getOnlinePlayerList(): Promise<UasecoPlayer[]> {
        return this.playerService.getOnlinePlayerList();
    }

    @SubscribeMessage('map/record/list')
    async getMapRecordList(client, data: any): Promise<UasecoRecord[]> {
        return this.recordService.getRecordList(data.mapId);
    }

    @SubscribeMessage('message/list')
    async getMessageList(client, data: any): Promise<AlyaMessage[]> {
        return this.messageService.getMessageList(data.messageNumber);
    }

    @SubscribeMessage('map/current')
    async getCurrentMap(): Promise<UasecoMap> {
        return this.mapService.getCurrentMap();
    }

    @SubscribeMessage('chat/message/send')
    async sendChatMessage(client, data: any): Promise<void> {
        return new Promise<void>(async executor => {
            this.appService.sendMessageAsConsole(data.message);
            executor(data);
        });
    }

}
