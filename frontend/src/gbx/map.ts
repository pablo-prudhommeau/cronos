import {Author} from './author';

export class Map {
    mapId: number;
    uid: string | null;
    filename: string | null;
    name: string | null;
    comment: string | null;
    author: Author | null;
    authorScore: number | null;
    authorTime: number | null;
    goldTime: number | null;
    silverTime: number | null;
    bronzeTime: number | null;
    environment: string | null;
    mood: string;
    cost: number | null;
    type: string | null;
    style: string | null;
    multiLap: string;
    nbLaps: number | null;
    nbCheckpoints: number | null;
    validated: string;
    exeVersion: string | null;
    exeBuild: string | null;
    modName: string | null;
    modFile: string | null;
    modUrl: string | null;
    songFile: string | null;
    songUrl: string | null;
}
