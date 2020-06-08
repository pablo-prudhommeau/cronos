import {Column, Entity, Index, JoinColumn, OneToOne} from 'typeorm';
import {UasecoPlayer} from './uaseco-player.entity';

@Entity('uaseco_settings', {schema: process.env.DB_NAME})
@Index('PlayerId', ['player'])
export class UasecoSetting {

    @Column('varchar', {
        nullable: false,
        primary: true,
        length: 64,
        name: 'Plugin'
    })
    plugin: string;

    @OneToOne(type => UasecoPlayer, uaseco_players => uaseco_players.uaseco_settings, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'PlayerId'})
    player: UasecoPlayer | null;

    @Column('varchar', {
        nullable: false,
        primary: true,
        length: 64,
        name: 'Key'
    })
    key: string;

    @Column('text', {
        nullable: true,
        name: 'Value'
    })
    value: string | null;

}
