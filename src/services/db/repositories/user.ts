import {EntityRepository, Repository} from 'typeorm';
import User from '../entities/user';
import * as bcrypt from 'bcryptjs';
import Profile from '../entities/profile';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    async loginUser(username: string, password: string): Promise<Pick<User, 'username'|'role'> | {error: string}> {
        const res = await this.createQueryBuilder()
            .select()
            .where('"User".username = :username', {username})
            .getOne();

        if (!res) return {error: 'Not found'};
        const hash = res.password;

        const hashMatches = await bcrypt.compare(password, hash);
        if (hashMatches) {
            return {
                username: res.username,
                role: res.role
            };
        }
        else {
            return {error: 'Unauthorized'};
        }
    }

    async registerUser(username: string, email: string, role: string, password: string)
        : Promise<Pick<User, 'username'|'email'>> {
        const user = new User();
        user.password = password;
        user.email = email;
        user.username = username;
        user.role = role;
        const profile = new Profile();
        profile.avatarUrl = '';
        profile.crosswordStatsId = '';
        profile.brainstormStatsId = '';
        profile.songStatsId = '';
        user.profile = profile;
        const res = await this.save(user);
        return {
            username: res.username,
            email: res.email
        };
    }

    async getAll(): Promise<Array<Pick<User, 'username' | 'email' | 'profile'>>> {
        const res = await this.createQueryBuilder()
            .select()
            .leftJoinAndSelect('User.profile', 'profile')
            .getMany();
        return res.map(u => {
            return {username: u.username, email: u.email, profile: u.profile};
        });
    }

    async getOne(username: string): Promise<Pick<User, 'username' | 'email' | 'profile'>> {
        const res = await this.createQueryBuilder()
            .select()
            .where('User.username = :username', {username})
            .leftJoinAndSelect('User.profile', 'profile')
            .getOne();
        return {
            username: res.username,
            email: res.email,
            profile: res.profile
        };
    }

    async getOneProfile(username: string):Promise<Profile> {
        const res = await this.createQueryBuilder()
            .select()
            .where('User.username = :username', {username})
            .leftJoinAndSelect('User.profile', 'profile')
            .getOne();
        return res.profile;
    }

    async deleteByUsername(username: string): Promise<void> {
        await this.createQueryBuilder()
            .delete()
            .where('User.username = :username', {username})
            .execute();
    }
}