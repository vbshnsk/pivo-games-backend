import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import Profile from './profile';

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    role: string;

    @OneToOne(type => Profile, {cascade: true})
    profile: Profile;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

}