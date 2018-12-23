import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {Player} from './player';
import {Message} from './message';
import {Record} from './record';
import {environment} from '../environments/environment';
import {Map} from './map';

@Injectable()
export class GbxService {

    private socket;

    connect() {
        this.socket = io(document.location.protocol + '//' + document.location.hostname + (environment.production ? '' : ':3000'), {
            secure: environment.production,
            path: environment.production ? '/ws' : '/socket.io'
        });
    }

    subscribeToPlayerConnection(): Observable<Player> {
        this.socket.emit('player/connect');
        const observable = new Observable<Player>((observer) => {
            this.socket.on('player/connect', (player: Player) => {
                observer.next(player);
            });
        });
        return observable;
    }

    subscribeToPlayerDisconnection(): Observable<Player> {
        this.socket.emit('player/disconnect');
        const observable = new Observable<Player>((observer) => {
            this.socket.on('player/disconnect', (player: Player) => {
                observer.next(player);
            });
        });
        return observable;
    }

    subscribeToMapChange(): Observable<Map> {
        this.socket.emit('map/change');
        const observable = new Observable<Map>((observer) => {
            this.socket.on('map/change', (map: Map) => {
                observer.next(map);
            });
        });
        return observable;
    }

    subscribeToPlayerMessage(): Observable<Message> {
        this.socket.emit('player/message');
        const observable = new Observable<Message>((observer) => {
            this.socket.on('player/message', (message: Message) => {
                observer.next(message);
            });
        });
        return observable;
    }

    getMapRecordList(mapId: number): Promise<Record[]> {
        return new Promise<Record[]>(executor => {
            this.socket.emit('map/record/list', {mapId: mapId}, (recordList: Record[]) => {
                executor(recordList);
            });
        });
    }

    getMessageList(): Promise<Message[]> {
        return new Promise<Message[]>(executor => {
            this.socket.emit('message/list', {}, (messageList: Message[]) => {
                executor(messageList);
            });
        });
    }

    getPlayerList(): Promise<Player[]> {
        return new Promise<Player[]>(executor => {
            this.socket.emit('player/list', {}, (playerList: Player[]) => {
                executor(playerList);
            });
        });
    }

    getCurrentMap(): Promise<Map> {
        return new Promise<Map>(executor => {
            this.socket.emit('map/current', {}, (currentMap: Map) => {
                executor(currentMap);
            });
        });
    }

}
