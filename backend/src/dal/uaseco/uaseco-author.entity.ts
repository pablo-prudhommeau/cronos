import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UasecoMap} from './uaseco-map.entity';

@Entity('uaseco_authors', {schema: process.env.DB_NAME})
@Index('Login', ['login'], {unique: true})
@Index('Continent', ['continent'])
@Index('Nation', ['nation'])
export class UasecoAuthor {

    @PrimaryGeneratedColumn({
        type: 'mediumint',
        name: 'AuthorId'
    })
    authorId: number;

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

    @OneToMany(type => UasecoMap, uaseco_maps => uaseco_maps.author, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
    uaseco_mapss: UasecoMap[];

}
