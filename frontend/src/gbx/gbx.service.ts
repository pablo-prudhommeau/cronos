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

    connect(): Promise<void> {
        this.socket = io(document.location.protocol + '//' + document.location.hostname + (environment.production ? '' : ':3000'), {
            secure: environment.production,
            path: environment.production ? '/ws' : '/ws/socket.io',
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity
        });

        const socket = this.socket;

        socket.on('connect', function () {
            socket.emit('player/connect');
            socket.emit('player/disconnect');
            socket.emit('player/message');
            socket.emit('map/change');
        });

        return new Promise<void>(executor => {
            this.socket.on('connect', function () {
                executor();
            });
        });
    }

    subscribeToPlayerConnection(): Observable<Player> {
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
        const observable = new Observable<Map>((observer) => {
            this.socket.on('map/change', (map: Map) => {
                observer.next(map);
            });
        });
        return observable;
    }

    subscribeToPlayerMessage(): Observable<Message> {
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

    getMessageList(messageNumber: number): Promise<Message[]> {
        return new Promise<Message[]>(executor => {
            this.socket.emit('message/list', {messageNumber: messageNumber}, (messageList: Message[]) => {
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

    getOnlinePlayerList(): Promise<Player[]> {
        return new Promise<Player[]>(executor => {
            this.socket.emit('player/online/list', {}, (playerList: Player[]) => {
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

    sendMessage(message: string): Promise<void> {
        return new Promise<void>(executor => {
            this.socket.emit('chat/message/send', {message: message}, () => {
                executor();
            });
        });
    }

}
