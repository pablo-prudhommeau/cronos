import {Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AlyaMessage} from '../alya/alya-message.entity';
import {UasecoPlaylist} from './uaseco-playlist.entity';
import {UasecoRanking} from './uaseco-ranking.entity';
import {UasecoRating} from './uaseco-rating.entity';
import {UasecoRecord} from './uaseco-record.entity';
import {UasecoSetting} from './uaseco-setting.entity';
import {UasecoTime} from './uaseco-time.entity';

@Entity('uaseco_players', {schema: process.env.DB_NAME})
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
export class UasecoPlayer {

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

    @OneToMany(type => UasecoPlaylist, uaseco_playlist => uaseco_playlist.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_playlists: UasecoPlaylist[];

    @OneToOne(type => UasecoRanking, uaseco_rankings => uaseco_rankings.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_rankings: UasecoRanking | null;

    @OneToOne(type => UasecoRating, uaseco_ratings => uaseco_ratings.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_ratings: UasecoRating | null;

    @OneToOne(type => UasecoRecord, uaseco_records => uaseco_records.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_records: UasecoRecord | null;

    @OneToOne(type => UasecoSetting, uaseco_settings => uaseco_settings.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_settings: UasecoSetting | null;

    @OneToOne(type => UasecoTime, uaseco_times => uaseco_times.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_times: UasecoTime | null;

    @OneToMany(type => AlyaMessage, uaseco_messages => uaseco_messages.player, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_messages: AlyaMessage[];

}
