import {Column, Entity, Index, JoinColumn, OneToOne} from 'typeorm';
import {UasecoMap} from './uaseco-map.entity';
import {UasecoPlayer} from './uaseco-player.entity';

@Entity('uaseco_playlist', {schema: process.env.DB_NAME})
@Index('Timestamp', ['timestamp'])
@Index('MapId', ['map'])
@Index('PlayerId', ['player'])
@Index('Method', ['method'])
export class UasecoPlaylist {

    @Column('decimal', {
        nullable: true,
        default: '0.000',
        precision: 17,
        scale: 3,
        name: 'Timestamp'
    })
    timestamp: string | null;

    @OneToOne(type => UasecoMap, uaseco_maps => uaseco_maps.uaseco_playlists, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'MapId'})
    map: UasecoMap | null;

    @OneToOne(type => UasecoPlayer, uaseco_players => uaseco_players.uaseco_playlists, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'PlayerId'})
    player: UasecoPlayer | null;

    @Column('enum', {
        nullable: true,
        default: 'select',
        enum: ['select', 'vote', 'pay', 'add'],
        name: 'Method'
    })
    method: string | null;

}
