import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UasecoPlayer} from '../uaseco/uaseco-player.entity';

@Entity('alya_messages', {schema: process.env.DB_NAME})
export class AlyaMessage {

    @PrimaryGeneratedColumn({
        type: 'mediumint',
        name: 'message_id'
    })
    messageId: number;

    @Column('datetime', {
        name: 'inserted_on',
        default: () => 'CURRENT_TIMESTAMP'
    })
    insertedOn: Date;

    @Column('text', {
        name: 'message'
    })
    message: string;

    @ManyToOne(type => UasecoPlayer, uaseco_players => uaseco_players.uaseco_messages, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn({name: 'playerId'})
    player: UasecoPlayer;

}
