import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Player} from '../player/player.entity';

@Entity('alya_messages', {schema: process.env.DB_NAME})
export class Message {

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

    @ManyToOne(type => Player, uaseco_players => uaseco_players.uaseco_messages, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn({name: 'playerId'})
    player: Player;

}
