import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {Player} from '../player/player.entity';

@Entity('uaseco_rankings', {schema: 'uaseco_dev'})
export class Ranking {

    @OneToOne(type => Player, uaseco_players => uaseco_players.uaseco_rankings, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'PlayerId'})
    player: Player | null;

    @Column('int', {
        nullable: true,
        default: '0',
        name: 'Average'
    })
    average: number | null;

}
