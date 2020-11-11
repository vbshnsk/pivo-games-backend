import { validatePassword, validateUsername } from '../plugins/validators/user';
import UserRepository from '../services/db/repositories/user';
import {auth} from '../plugins/auth';
import {guard} from '../plugins/typeguards';

declare module 'fastify' {
    export interface FastifyInstance {
        validatePassword: validatePassword;
        validateUsername: validateUsername;
        db: {
            connectToDb: (test: boolean) => Promise<void>
            user: () => UserRepository
        };
        jwt: auth;
        guard: guard;
    }
}
