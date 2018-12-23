import {Column, Entity, Index, JoinColumn, OneToOne} from 'typeorm';
import {Map} from '../map/map.entity';
import {Player} from '../player/player.entity';

@Entity('uaseco_ratings', {schema: 'uaseco_dev'})
@Index('MapId', ['map'])
@Index('PlayerId', ['player'])
@Index('Date', ['date'])
@Index('Score', ['score'])
export class Rating {

    @OneToOne(type => Map, uaseco_maps => uaseco_maps.uaseco_ratings, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'MapId'})
    map: Map | null;

    @OneToOne(type => Player, uaseco_players => uaseco_players.uaseco_ratings, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'PlayerId'})
    player: Player | null;

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
