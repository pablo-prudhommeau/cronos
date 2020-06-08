import {Column, Entity, Index, JoinColumn, OneToOne} from 'typeorm';
import {UasecoMap} from './uaseco-map.entity';

@Entity('uaseco_maphistory', {schema: process.env.DB_NAME})
@Index('MapId', ['map'])
@Index('Date', ['date'])
export class UasecoMapHistory {

    @OneToOne(type => UasecoMap, uaseco_maps => uaseco_maps.uaseco_maphistorys, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'MapId'})
    map: UasecoMap | null;

    @Column('datetime', {
        nullable: true,
        default: '1970-01-01 00:00:00',
        name: 'Date'
    })
    date: Date | null;

}
