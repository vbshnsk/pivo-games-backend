import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, JoinColumn, Unique} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import Profile from './profile';

@Entity()
@Unique('uq-email', ['email'])
@Unique('uq-username', ['username'])
export default class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    role: string;

    @OneToOne(() => Profile, {cascade: true})
    @JoinColumn()
    profile: Profile;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

}