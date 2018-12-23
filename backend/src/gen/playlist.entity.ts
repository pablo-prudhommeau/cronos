import {Column, Entity, Index, JoinColumn, OneToOne} from 'typeorm';
import {Map} from '../map/map.entity';
import {Player} from '../player/player.entity';

@Entity('uaseco_playlist', {schema: 'uaseco_dev'})
@Index('Timestamp', ['timestamp'])
@Index('MapId', ['map'])
@Index('PlayerId', ['player'])
@Index('Method', ['method'])
export class Playlist {

    @Column('decimal', {
        nullable: true,
        default: '0.000',
        precision: 17,
        scale: 3,
        name: 'Timestamp'
    })
    timestamp: string | null;

    @OneToOne(type => Map, uaseco_maps => uaseco_maps.uaseco_playlists, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'MapId'})
    map: Map | null;

    @OneToOne(type => Player, uaseco_players => uaseco_players.uaseco_playlists, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'PlayerId'})
    player: Player | null;

    @Column('enum', {
        nullable: true,
        default: 'select',
        enum: ['select', 'vote', 'pay', 'add'],
        name: 'Method'
    })
    method: string | null;

}
