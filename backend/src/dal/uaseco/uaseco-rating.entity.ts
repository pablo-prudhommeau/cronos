import {Column, Entity, Index, JoinColumn, OneToOne} from 'typeorm';
import {UasecoMap} from './uaseco-map.entity';
import {UasecoPlayer} from './uaseco-player.entity';

@Entity('uaseco_ratings', {schema: process.env.DB_NAME})
@Index('MapId', ['map'])
@Index('PlayerId', ['player'])
@Index('Date', ['date'])
@Index('Score', ['score'])
export class UasecoRating {

    @OneToOne(type => UasecoMap, uaseco_maps => uaseco_maps.uaseco_ratings, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'MapId'})
    map: UasecoMap | null;

    @OneToOne(type => UasecoPlayer, uaseco_players => uaseco_players.uaseco_ratings, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'PlayerId'})
    player: UasecoPlayer | null;

    @Column('timestamp', {
        nullable: true,
        default: 'CURRENT_TIMESTAMP',
        name: 'Date'
    })
    date: Date | null;

    @Column('tinyint', {
        nullable: true,
        width: 1,
        default: '0',
        name: 'Score'
    })
    score: boolean | null;

}
