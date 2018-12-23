import {Player} from './player';
import {Map} from './map';

export class Record {
    map: Map | null;
    player: Player | null;
    gamemodeId: number;
    date: Date | null;
    score: number | null;
    checkpoints: string | null;
}
