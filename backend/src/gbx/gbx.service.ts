import * as gbxRemote from 'gbxremote';
import {GbxRemote} from 'gbxremote';
import {Injectable} from '@nestjs/common';
import {Subject} from 'rxjs';
import {GbxPlayer} from './gbx.player';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {GbxMap} from './gbx.map';
import {GbxPlayerChat} from './gbx.player-chat';
import {ConfigService} from 'nestjs-config';

@Injectable()
export class GbxService {

    private client: GbxRemote;
    private logger: Logger = log4js.getLogger();

    public static playerConnectionSubject: Subject<GbxPlayer> = new Subject<GbxPlayer>();
    public static playerDisconnectionSubject: Subject<GbxPlayer> = new Subject<GbxPlayer>();
    public static playerChatSubject: Subject<GbxPlayerChat> = new Subject<GbxPlayerChat>();
    public static beginMapSubject: Subject<GbxMap> = new Subject<GbxMap>();

    constructor(private readonly configService: ConfigService) {}

    connect() {
        this.logger.info('Trying to connect to XML-RPC API...');
        const client = gbxRemote.createClient(this.configService.get('maniaplanet-rpc.port'), this.configService.get('maniaplanet-rpc.host'));
        this.client = client;

        client.on('error', (error) => {
            this.logger.error('Error while connecting to XML-RPC API !', error);
        });

        client.on('connect', () => {
            this.logger.info('Successfully connected to XML-RPC API !');
            this.logger.info('Trying to authenticate to XML-RPC API...');
            client.query('Authenticate', [
                this.configService.get('maniaplanet-rpc.username'),
                this.configService.get('maniaplanet-rpc.password')
            ]).then((data) => {
                if (data === true) {
                    this.logger.info('Successfully authenticated to XML-RPC API !');
                }
            }).catch((err) => {
                this.logger.error('error:', err);
            });

            client.query('SetApiVersion', ['2012-06-19']).catch((err) => {
                this.logger.error('Error when querying server:', err);
            });
            client.query('EnableCallbacks', [true]).catch((err) => {
                this.logger.error('Error when querying server:', err);
            });

            client.on('ManiaPlanet.PlayerConnect', (data: GbxPlayer) => {
                GbxService.playerConnectionSubject.next(data);
            });

            client.on('ManiaPlanet.PlayerDisconnect', (data: GbxPlayer) => {
                GbxService.playerDisconnectionSubject.next(data);
            });

            client.on('ManiaPlanet.PlayerChat', (data: any[]) => {
                const gbxPlayerChat: GbxPlayerChat = {
                    PlayerUid: data[0],
                    Login: data[1],
                    Text: data[2],
                    IsRegistredCmd: data[3]
                };
                GbxService.playerChatSubject.next(gbxPlayerChat);
            });

            client.on('ManiaPlanet.BeginMap', (data) => {
                GbxService.beginMapSubject.next(data[0]);
            });

            client.on('callback', (method, params) => {
                // this.logger.debug('Callback from server: %s - %d params', method, params.length);
            });
        });

    }

    disconnect() {
        gbxRemote.client.terminate();
    }

    getPlayerList(): Promise<GbxPlayer[]> {
        const client = this.client;
        return new Promise(executor => {
            client.query('GetPlayerList', [1000, 0]).then((gbxPlayerList: GbxPlayer[]) => {
                gbxPlayerList = gbxPlayerList.filter((gbxPlayer: GbxPlayer) => {
                    const isServer = String(gbxPlayer.Flags).substring(3, 4) === '1';
                    return !isServer;
                });
                executor(gbxPlayerList);
            });
        });
    }

    getCurrentGbxMap(): Promise<GbxMap> {
        const client = this.client;
        return new Promise(executor => {
            client.query('GetCurrentMapInfo').then((data: GbxMap) => {
                executor(data);
            });
        });
    }

    getChatLineList(): Promise<GbxPlayerChat[]> {
        const client = this.client;
        return new Promise(executor => {
            client.query('GetChatLines').then((data: GbxPlayerChat[]) => {
                executor(data);
            });
        });
    }

}
