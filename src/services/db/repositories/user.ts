import {EntityRepository, Repository} from 'typeorm';
import User from '../entities/user';
import * as bcrypt from 'bcryptjs';
import Profile from '../entities/profile';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    async loginUser(username: string, password: string): Promise<Pick<User, 'username'|'role'> | null> {
        const res = await this.createQueryBuilder()
            .select()
            .where('"User".username = :username', {username})
            .getOne();
        const hash = res.password;

        const hashMatches = await bcrypt.compare(password, hash);
        if (hashMatches) {
            return {
                username: res.username,
                role: res.role
            };
        }
        else {
            return null;
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
        try {
            const res = await this.save(user);
            return {
                username: res.username,
                email: res.email
            };
        }
        catch (e) {
            console.log(123)
        }
    }
}