import {Column, Entity, Index, JoinColumn, OneToOne} from 'typeorm';
import {UasecoMap} from './uaseco-map.entity';
import {UasecoPlayer} from './uaseco-player.entity';

@Entity('uaseco_records', {schema: process.env.DB_NAME})
@Index('MapId', ['map'])
@Index('PlayerId', ['player'])
@Index('GamemodeId', ['gamemodeId'])
@Index('Date', ['date'])
@Index('Score', ['score'])
export class UasecoRecord {

    @OneToOne(type => UasecoMap, uaseco_maps => uaseco_maps.uaseco_records, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'MapId'})
    map: UasecoMap | null;

    @OneToOne(type => UasecoPlayer, uaseco_players => uaseco_players.uaseco_records, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'PlayerId'})
    player: UasecoPlayer | null;

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
        nullable: true,
        default: '0',
        name: 'Score'
    })
    score: number | null;

    @Column('text', {
        nullable: true,
        name: 'Checkpoints'
    })
    checkpoints: string | null;

}
