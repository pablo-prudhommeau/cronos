import {AfterViewInit, Component, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {GbxService} from '../../gbx/gbx.service';
import {Player} from '../../gbx/player';
import {Record} from '../../gbx/record';
import {Message} from '../../gbx/message';
import {Map} from '../../gbx/map';
import * as datefns from 'date-fns';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../app.component.scss', './dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, AfterViewInit {

    playerList: Player[] = [];
    onlinePlayerList: Player[] = [];
    currentMap: Map;
    currentMapRecordList: Record[] = [];
    messageList: Message[] = [];

    constructor(private gbxService: GbxService) {}

    @ViewChildren('chatMessage') chatMessageList: QueryList<any>;

    ngAfterViewInit() {}

    ngOnInit() {
        this.gbxService.connect().then(() => {
            this.initializeDashboardData();
        });
    }

    initializeDashboardData() {
        this.gbxService.getPlayerList().then((playerList: Player[]) => {
            this.playerList = playerList;
        });

        this.gbxService.getOnlinePlayerList().then((onlinePlayerList: Player[]) => {
            this.onlinePlayerList = onlinePlayerList;

            const internalPlayerList = this.onlinePlayerList;
            this.gbxService.subscribeToPlayerConnection().subscribe((player: Player) => {
                internalPlayerList.push(player);

                this.gbxService.getPlayerList().then((playerList: Player[]) => {
                    this.playerList = playerList;
                });
            });
            this.gbxService.subscribeToPlayerDisconnection().subscribe((player: Player) => {
                const playerToRemove: Player = internalPlayerList.find((p) => p.login === player.login);
                const index = internalPlayerList.indexOf(playerToRemove);
                internalPlayerList.splice(index, 1);
            });
        });

        this.gbxService.getMessageList(50).then((messageList: Message[]) => {
            this.messageList = messageList;

            this.gbxService.subscribeToPlayerMessage().subscribe((message: Message) => {
                this.messageList.unshift(message);
            });

            this.chatMessageList.changes.subscribe(changes => {
                changes.last.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
            });
        });

        this.gbxService.getCurrentMap().then((map: Map) => {
            this.currentMap = map;
            this.gbxService.subscribeToMapChange().subscribe(async (map: Map) => {
                if (this.currentMap === undefined || this.currentMap.uid !== map.uid) {
                    this.currentMap = map;
                }
                const recordList: Record[] = await this.gbxService.getMapRecordList(map.mapId);
                this.currentMapRecordList = [];
                for (const record of recordList) {
                    this.currentMapRecordList.push(record);
                }
            });

            this.gbxService.getMapRecordList(map.mapId).then((recordList: Record[]) => {
                this.currentMapRecordList = recordList;
            });
        });
    }

    getBestRecord(): Record | null {
        const orderedRecords = this.currentMapRecordList.sort((a: Record, b: Record) => {
            if (a.score < b.score) {
                return -1;
            } else if (a.score > b.score) {
                return 1;
            } else {
                return 0;
            }
        });
        return orderedRecords[0];
    }

    getPlayerConnectionDay(): Player[] | null {
        return this.playerList.filter((player: Player) => datefns.isToday(player.lastVisit));
    }

    getPlayerConnectionWeek(): Player[] | null {
        const startOfWeek: Date = datefns.startOfISOWeek(new Date());
        const endOfWeek: Date = datefns.endOfISOWeek(new Date());
        return this.playerList.filter((player: Player) => {
            return datefns.isWithinRange(player.lastVisit, startOfWeek, endOfWeek);
        });
    }

    getPlayerConnectionMonth(): Player[] | null {
        const startOfMonth: Date = datefns.startOfMonth(new Date());
        const endOfMonth: Date = datefns.endOfMonth(new Date());
        return this.playerList.filter((player: Player) => {
            return datefns.isWithinRange(player.lastVisit, startOfMonth, endOfMonth);
        });
    }

}
