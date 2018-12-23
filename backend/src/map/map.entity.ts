import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Author} from './author.entity';
import {MapHistory} from '../gen/map-history.entity';
import {Playlist} from '../gen/playlist.entity';
import {Rating} from '../gen/rating.entity';
import {Record} from '../record/record.entity';
import {Time} from '../gen/time.entity';

@Entity('uaseco_maps', {schema: 'uaseco_dev'})
@Index('Uid', ['uid'], {unique: true})
@Index('AuthorId', ['author'])
@Index('AuthorScore', ['authorScore'])
@Index('AuthorTime', ['authorTime'])
@Index('GoldTime', ['goldTime'])
@Index('SilverTime', ['silverTime'])
@Index('BronzeTime', ['bronzeTime'])
@Index('Environment', ['environment'])
@Index('Mood', ['mood'])
@Index('MultiLap', ['multiLap'])
@Index('NbLaps', ['nbLaps'])
@Index('NbCheckpoints', ['nbCheckpoints'])
export class Map {

    @PrimaryGeneratedColumn({
        type: 'mediumint',
        name: 'MapId'
    })
    mapId: number;

    @Column('varchar', {
        nullable: true,
        unique: true,
        length: 27,
        default: '',
        name: 'Uid'
    })
    uid: string | null;

    @Column('text', {
        nullable: true,
        name: 'Filename'
    })
    filename: string | null;

    @Column('varchar', {
        nullable: true,
        length: 100,
        default: '',
        name: 'Name'
    })
    name: string | null;

    @Column('text', {
        nullable: true,
        name: 'Comment'
    })
    comment: string | null;

    @ManyToOne(type => Author, uaseco_authors => uaseco_authors.uaseco_mapss, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn({name: 'AuthorId'})
    author: Author | null;

    @Column('int', {
        nullable: true,
        default: '0',
        name: 'AuthorScore'
    })
    authorScore: number | null;

    @Column('int', {
        nullable: true,
        default: '0',
        name: 'AuthorTime'
    })
    authorTime: number | null;

    @Column('int', {
        nullable: true,
        default: '0',
        name: 'GoldTime'
    })
    goldTime: number | null;

    @Column('int', {
        nullable: true,
        default: '0',
        name: 'SilverTime'
    })
    silverTime: number | null;

    @Column('int', {
        nullable: true,
        default: '0',
        name: 'BronzeTime'
    })
    bronzeTime: number | null;

    @Column('varchar', {
        nullable: true,
        length: 10,
        default: '',
        name: 'Environment'
    })
    environment: string | null;

    @Column('enum', {
        nullable: false,
        enum: ['unknown', 'Sunrise', 'Day', 'Sunset', 'Night'],
        name: 'Mood'
    })
    mood: string;

    @Column('mediumint', {
        nullable: true,
        default: '0',
        name: 'Cost'
    })
    cost: number | null;

    @Column('varchar', {
        nullable: true,
        length: 32,
        default: '',
        name: 'Type'
    })
    type: string | null;

    @Column('varchar', {
        nullable: true,
        length: 32,
        default: '',
        name: 'Style'
    })
    style: string | null;

    @Column('enum', {
        nullable: false,
        enum: ['false', 'true'],
        name: 'MultiLap'
    })
    multiLap: string;

    @Column('tinyint', {
        nullable: true,
        default: '0',
        name: 'NbLaps'
    })
    nbLaps: number | null;

    @Column('tinyint', {
        nullable: true,
        default: '0',
        name: 'NbCheckpoints'
    })
    nbCheckpoints: number | null;

    @Column('enum', {
        nullable: false,
        enum: ['null', 'false', 'true'],
        name: 'Validated'
    })
    validated: string;

    @Column('varchar', {
        nullable: true,
        length: 16,
        default: '',
        name: 'ExeVersion'
    })
    exeVersion: string | null;

    @Column('varchar', {
        nullable: true,
        length: 32,
        default: '',
        name: 'ExeBuild'
    })
    exeBuild: string | null;

    @Column('varchar', {
        nullable: true,
        length: 64,
        default: '',
        name: 'ModName'
    })
    modName: string | null;

    @Column('varchar', {
        nullable: true,
        length: 256,
        default: '',
        name: 'ModFile'
    })
    modFile: string | null;

    @Column('text', {
        nullable: true,
        name: 'ModUrl'
    })
    modUrl: string | null;

    @Column('varchar', {
        nullable: true,
        length: 256,
        default: '',
        name: 'SongFile'
    })
    songFile: string | null;

    @Column('text', {
        nullable: true,
        name: 'SongUrl'
    })
    songUrl: string | null;

    @OneToMany(type => MapHistory, uaseco_maphistory => uaseco_maphistory.map, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_maphistorys: MapHistory[];

    @OneToMany(type => Playlist, uaseco_playlist => uaseco_playlist.map, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    uaseco_playlists: Playlist[];

    @OneToOne(type => Rating, uaseco_ratings => uaseco_ratings.map, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    uaseco_ratings: Rating | null;

    @OneToOne(type => Record, uaseco_records => uaseco_records.map, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    uaseco_records: Record | null;

    @OneToOne(type => Time, uaseco_times => uaseco_times.map, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    uaseco_times: Time | null;

}
