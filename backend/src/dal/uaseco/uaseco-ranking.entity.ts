import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {UasecoPlayer} from './uaseco-player.entity';

@Entity('uaseco_rankings', {schema: process.env.DB_NAME})
export class UasecoRanking {

    @OneToOne(type => UasecoPlayer, uaseco_players => uaseco_players.uaseco_rankings, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'PlayerId'})
    player: UasecoPlayer | null;

    @Column('int', {
        nullable: true,
        default: '0',
        name: 'Average'
    })
    average: number | null;

}
