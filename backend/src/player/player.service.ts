import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as log4js from 'log4js';
import {Logger} from 'log4js';
import {Observable} from 'rxjs';
import {InsertResult, Repository} from 'typeorm';
import {ConfigService} from '../config/config.service';
import {AlyaMessage} from '../dal/alya/alya-message.entity';
import {UasecoPlayer} from '../dal/uaseco/uaseco-player.entity';
import {GbxService} from '../gbx/gbx.service';
import {GbxPlayer} from '../gbx/structs/gbx-player';
import {GbxPlayerChat} from '../gbx/structs/gbx-player-chat';
import {GbxPlayerInfo} from '../gbx/structs/gbx-player-info';
import {MessageService} from '../message/message.service';

@Injectable()
export class PlayerService {

    private logger: Logger = log4js.getLogger();

    constructor(
            private readonly gbxService: GbxService,
            private readonly messageService: MessageService,
            private readonly configService: ConfigService,
            @InjectRepository(UasecoPlayer) private readonly uasecoPlayerRepository: Repository<UasecoPlayer>
    ) {
        GbxService.playerChatSubject.subscribe(async (gbxPlayerChat: GbxPlayerChat) => {
            if (gbxPlayerChat.PlayerUid == '0') {
                return;
            }

            const uasecoPlayer: UasecoPlayer = await this.uasecoPlayerRepository.findOne({
                where: {
                    login: gbxPlayerChat.Login
                }
            });

            const alyaMessage = new AlyaMessage();
            alyaMessage.player = uasecoPlayer;
            alyaMessage.message = gbxPlayerChat.Text;

            const messageInsertResult: InsertResult = await this.messageService.insert(alyaMessage);
            alyaMessage.messageId = messageInsertResult.identifiers[0].messageId;

            this.messageService.alyaMessageSubject.next(alyaMessage);
        });
    }

    subscribeToPlayerConnection(): Observable<UasecoPlayer> {
        return new Observable<UasecoPlayer>(observer => {
            GbxService.playerConnectionSubject.subscribe(async (gbxPlayer: GbxPlayer) => {
                const self = this;
                // postpone uaseco player fetching mechanism due to insertion delay on uaseco side
                setTimeout(async function() {
                    const uasecoPlayer: UasecoPlayer = await self.uasecoPlayerRepository.findOne({
                        where: {
                            login: gbxPlayer.Login
                        }
                    });
                    observer.next(uasecoPlayer);
                }, 200);
            });
        });
    }

    subscribeToPlayerDisconnection(): Observable<UasecoPlayer> {
        return new Observable<UasecoPlayer>(observer => {
            GbxService.playerDisconnectionSubject.subscribe(async (gbxPlayer: GbxPlayer) => {
                const player: UasecoPlayer = await this.uasecoPlayerRepository.findOne({
                    where: {
                        login: gbxPlayer.Login
                    }
                });
                observer.next(player);
            });
        });
    }

    getPlayerList(): Promise<UasecoPlayer[]> {
        return new Promise<UasecoPlayer[]>(async resolve => {
            const playerList = await this.uasecoPlayerRepository.find({
                order: {
                    lastVisit: 'DESC'
                }
            });
            resolve(playerList);
        });
    }

    getOnlinePlayerList(): Promise<UasecoPlayer[]> {
        return new Promise<UasecoPlayer[]>(async resolve => {
            const playerList: UasecoPlayer[] = [];
            const gbxPlayerInfoList: GbxPlayerInfo[] = await this.gbxService.getPlayerList();
            for (const gbxPlayer of gbxPlayerInfoList) {
                const player: UasecoPlayer = await this.uasecoPlayerRepository.findOne({
                    where: {
                        login: gbxPlayer.Login
                    }
                });
                playerList.push(player);
            }
            resolve(playerList);
        });
    }

}
