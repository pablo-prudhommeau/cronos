import {Column, Entity, Index, JoinColumn, OneToOne} from 'typeorm';
import {Map} from '../map/map.entity';
import {Player} from '../player/player.entity';

@Entity('uaseco_times', {schema: 'uaseco_dev'})
@Index('MapId', ['map'])
@Index('PlayerId', ['player'])
@Index('GamemodeId', ['gamemodeId'])
@Index('Date', ['date'])
@Index('Score', ['score'])
export class Time {

    @OneToOne(type => Map, uaseco_maps => uaseco_maps.uaseco_times, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'MapId'})
    map: Map | null;

    @OneToOne(type => Player, uaseco_players => uaseco_players.uaseco_times, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'PlayerId'})
    player: Player | null;

    @Column('tinyint', {
        nullable: false,
        primary: true,
        default: '0',
        name: 'GamemodeId'
    })
    gamemodeId: number;

    @Column('datetime', {
        nullable: true,
        default: '1970-01-01 00:00:00',
        name: 'Date'
    })
    date: Date | null;

    @Column('int', {
        nullable: false,
        primary: true,
        default: '0',
        name: 'Score'
    })
    score: number;

    @Column('text', {
        nullable: true,
        name: 'Checkpoints'
    })
    checkpoints: string | null;

}