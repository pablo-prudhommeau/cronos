import {Injectable} from '@nestjs/common';
import * as gbxRemote from 'gbxremote';
import {GbxRemote} from 'gbxremote';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Subject} from 'rxjs';
import {ConfigService} from '../config/config.service';
import {GbxMap} from './gbx-map';
import {GbxPlayer} from './gbx-player';
import {GbxPlayerChat} from './gbx-player-chat';
import {GbxPlayerInfo} from './gbx-player-info';

@Injectable()
export class GbxService {

    public static playerConnectionSubject: Subject<GbxPlayer> = new Subject<GbxPlayer>();
    public static playerDisconnectionSubject: Subject<GbxPlayer> = new Subject<GbxPlayer>();
    public static playerChatSubject: Subject<GbxPlayerChat> = new Subject<GbxPlayerChat>();
    public static beginMapSubject: Subject<GbxMap> = new Subject<GbxMap>();

    private static MAX_NUMBER_OF_RECONNECTIONS = 5;
    private static TIME_BETWEEN_RECONNECTION_IN_MILLISECONDS = 5000;

    private client: GbxRemote;
    private logger: Logger = log4js.getLogger();
    private numberOfReconnection = 0;

    constructor(private readonly configService: ConfigService) {}

    connect() {
        this.logger.info('Trying to connect to XML-RPC API...');

        const client = gbxRemote.createClient(this.configService.getString('MANIAPLANET_RPC_PORT'), this.configService.getString('MANIAPLANET_RPC_HOST'));
        this.client = client;

        const self = this;

        client.on('error', (error) => {
            this.logger.error('Error while connecting to XML-RPC API !', error);
            if (this.numberOfReconnection >= GbxService.MAX_NUMBER_OF_RECONNECTIONS) {
                process.exit(1);
            } else {
                this.logger.error('Waiting ' + GbxService.TIME_BETWEEN_RECONNECTION_IN_MILLISECONDS / 1000 + ' seconds after reconnect...');
                setTimeout(function() {
                    self.connect();
                    self.numberOfReconnection++;
                }, GbxService.TIME_BETWEEN_RECONNECTION_IN_MILLISECONDS);
            }
        });

        client.on('connect', () => {
            this.numberOfReconnection = 0;
            this.logger.info('Successfully connected to XML-RPC API !');
            this.logger.info('Trying to authenticate to XML-RPC API...');
            client.query('Authenticate', [
                this.configService.getString('MANIAPLANET_RPC_USERNAME'),
                this.configService.getString('MANIAPLANET_RPC_PASSWORD')
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

            client.on('ManiaPlanet.PlayerConnect', (data: any[]) => {
                const gbxPlayer: GbxPlayer = {
                    Login: data[0],
                    IsSpectator: data[1]
                };
                GbxService.playerConnectionSubject.next(gbxPlayer);
            });

            client.on('ManiaPlanet.PlayerDisconnect', (data: any[]) => {
                const gbxPlayer: GbxPlayer = {
                    Login: data[0],
                    IsSpectator: data[1]
                };
                GbxService.playerDisconnectionSubject.next(gbxPlayer);
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
        });

    }

    disconnect() {
        gbxRemote.client.terminate();
    }

    getPlayerList(): Promise<GbxPlayerInfo[]> {
        const client = this.client;
        return new Promise(executor => {
            client.query('GetPlayerList', [1000, 0]).then((gbxPlayerInfoList: GbxPlayerInfo[]) => {
                gbxPlayerInfoList = gbxPlayerInfoList.filter((gbxPlayerInfo: GbxPlayerInfo) => {
                    const isServer = String(gbxPlayerInfo.Flags).substring(3, 4) === '1';
                    return !isServer;
                });
                executor(gbxPlayerInfoList);
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

    sendMessage(message: string): Promise<void> {
        const client = this.client;
        return new Promise(executor => {
            client.query('ChatSendServerMessage', [message]).then(() => {
                executor();
            });
        });
    }

}
