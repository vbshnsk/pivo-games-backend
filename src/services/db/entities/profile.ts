import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export default class Profile {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    crosswordStatsId: string;

    @Column()
    brainstormStatsId: string;

    @Column()
    songStatsId: string;

    @Column()
    avatarUrl: string;

}