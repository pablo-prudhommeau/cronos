import {Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Playlist} from '../gen/playlist.entity';
import {Ranking} from '../gen/ranking.entity';
import {Rating} from '../gen/rating.entity';
import {Record} from '../record/record.entity';
import {Setting} from '../gen/setting.entity';
import {Time} from '../gen/time.entity';
import {Message} from '../message/message.entity';

@Entity('uaseco_players', {schema: 'uaseco_dev'})
@Index('Login', ['login'], {unique: true})
@Index('Continent', ['continent'])
@Index('Nation', ['nation'])
@Index('LastVisit', ['lastVisit'])
@Index('Visits', ['visits'])
@Index('Wins', ['wins'])
@Index('Donations', ['donations'])
@Index('TimePlayed', ['timePlayed'])
@Index('MostFinished', ['mostFinished'])
@Index('MostRecords', ['mostRecords'])
@Index('RoundPoints', ['roundPoints'])
@Index('TeamPoints', ['teamPoints'])
@Index('WinningPayout', ['winningPayout'])
export class Player {

    @PrimaryGeneratedColumn({
        type: 'mediumint',
        name: 'PlayerId'
    })
    playerId: number;

    @Column('varchar', {
        nullable: true,
        unique: true,
        length: 64,
        default: '',
        name: 'Login'
    })
    login: string | null;

    @Column('varchar', {
        nullable: true,
        length: 100,
        default: '',
        name: 'Nickname'
    })
    nickname: string | null;

    @Column('varchar', {
        nullable: true,
        length: 256,
        default: '',
        name: 'Zone'
    })
    zone: string | null;

    @Column('varchar', {
        nullable: true,
        length: 2,
        default: '',
        name: 'Continent'
    })
    continent: string | null;

    @Column('varchar', {
        nullable: true,
        length: 3,
        default: '',
        name: 'Nation'
    })
    nation: string | null;

    @Column('datetime', {
        nullable: true,
        default: '1970-01-01 00:00:00',
        name: 'LastVisit'
    })
    lastVisit: Date | null;

    @Column('mediumint', {
        nullable: true,
        default: '0',
        name: 'Visits'
    })
    visits: number | null;

    @Column('mediumint', {
        nullable: true,
        default: '0',
        name: 'Wins'
    })
    wins: number | null;

    @Column('mediumint', {
        nullable: true,
        default: '0',
        name: 'Donations'
    })
    donations: number | null;

    @Column('int', {
        nullable: true,
        default: '0',
        name: 'TimePlayed'
    })
    timePlayed: number | null;

    @Column('mediumint', {
        nullable: false,
        default: '0',
        name: 'MostFinished'
    })
    mostFinished: number;

    @Column('mediumint', {
        nullable: false,
        default: '0',
        name: 'MostRecords'
    })
    mostRecords: number;

    @Column('mediumint', {
        nullable: false,
        default: '0',
        name: 'RoundPoints'
    })
    roundPoints: number;

    @Column('mediumint', {
        nullable: false,
        default: '0',
        name: 'TeamPoints'
    })
    teamPoints: number;

    @Column('mediumint', {
        nullable: false,
        default: '0',
        name: 'WinningPayout'
    })
    winningPayout: number;

    @OneToMany(type => Playlist, uaseco_playlist => uaseco_playlist.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_playlists: Playlist[];

    @OneToOne(type => Ranking, uaseco_rankings => uaseco_rankings.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_rankings: Ranking | null;

    @OneToOne(type => Rating, uaseco_ratings => uaseco_ratings.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_ratings: Rating | null;

    @OneToOne(type => Record, uaseco_records => uaseco_records.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_records: Record | null;

    @OneToOne(type => Setting, uaseco_settings => uaseco_settings.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_settings: Setting | null;

    @OneToOne(type => Time, uaseco_times => uaseco_times.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_times: Time | null;

    @OneToMany(type => Message, uaseco_messages => uaseco_messages.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_messages: Message[];

}
