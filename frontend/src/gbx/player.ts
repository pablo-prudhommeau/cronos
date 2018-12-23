export class Player {
    playerId: number;
    login: string | null;
    nickname: string | null;
    zone: string | null;
    continent: string | null;
    nation: string | null;
    lastVisit: Date | null;
    visits: number | null;
    wins: number | null;
    donations: number | null;
    timePlayed: number | null;
    mostFinished: number;
    mostRecords: number;
    roundPoints: number;
    teamPoints: number;
    winningPayout: number;
}
