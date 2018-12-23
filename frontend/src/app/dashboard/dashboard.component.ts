import {Component, ElementRef, HostBinding, OnInit, QueryList, ViewChild, ViewEncapsulation} from '@angular/core';
import {GbxService} from '../../gbx/gbx.service';
import {Player} from '../../gbx/player';
import {Record} from '../../gbx/record';
import {Message} from '../../gbx/message';
import {Map} from '../../gbx/map';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../app.component.scss', './dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('pageAnimations', [
            transition(':enter', [
                query('.chat-message', [
                    style({opacity: 0, transform: 'translateX(-500px)'}),
                    stagger(-30, [
                        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 1, transform: 'none'}))
                    ])
                ], {optional: true})
            ])
        ]),
        trigger('filterAnimation', [
            transition(':enter, * => 0, * => -1', []),
            transition(':increment', [
                query(':enter', [
                    style({opacity: 0, width: '0px'}),
                    stagger(50, [
                        animate('300ms ease-out', style({opacity: 1, width: '*'})),
                    ])
                ], {optional: true})
            ]),
            transition(':decrement', [
                query(':leave', [
                    stagger(50, [
                        animate('300ms ease-out', style({opacity: 0, width: '0px'})),
                    ])
                ])
            ])
        ])
    ]
})
export class DashboardComponent implements OnInit {

    @ViewChild('scrollMe')
    private myScrollContainer: ElementRef;

    @HostBinding('@pageAnimations')
    public animatePage = true;

    public isLocked = true;

    things: QueryList<any>;
    heroTotal = -1;

    playerList: Player[] = [];
    currentMap: Map;
    currentMapRecordList: Record[] = [];
    messageList: Message[] = [];

    constructor(private gbxService: GbxService) {}

    onScroll(event: any) {
        const scrollHeight = this.myScrollContainer.nativeElement.scrollHeight;
        const scrollTop = this.myScrollContainer.nativeElement.scrollTop;
        const offsetHeight = this.myScrollContainer.nativeElement.offsetHeight;
        console.log(event + ' - ' + scrollHeight + ' - ' + scrollTop + ' - ' + offsetHeight);
    }

    ngOnInit() {
        this.gbxService.connect();
        this.getDashboardInfo().then(() => {
            this.startSubscriptions();
        });
    }

    async getDashboardInfo() {
        const playerList: Player[] = await this.gbxService.getPlayerList();
        for (const player of playerList) {
            this.playerList.push(player);
        }

        const messageList: Message[] = await this.gbxService.getMessageList();
        for (const message of messageList) {
            this.messageList.push(message);
        }
        this.heroTotal = messageList.length;

        const map: Map = await this.gbxService.getCurrentMap();
        this.currentMap = map;

        const recordList: Record[] = await this.gbxService.getMapRecordList(map.mapId);
        for (const record of recordList) {
            this.currentMapRecordList.push(record);
        }
    }

    startSubscriptions() {
        const players = this.playerList;

        this.gbxService.subscribeToPlayerConnection().subscribe((player: Player) => {
            players.push(player);
        });

        this.gbxService.subscribeToPlayerDisconnection().subscribe((player: Player) => {
            const playerToRemove: Player = players.find((p) => p.login === player.login);
            const index = players.indexOf(playerToRemove);
            players.splice(index, 1);
        });

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

        this.gbxService.subscribeToPlayerMessage().subscribe((message: Message) => {
            this.messageList.push(message);
            this.heroTotal += 1;
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

}
