import { validatePassword, validateUsername } from '../plugins/validators/user';
import UserRepository from '../services/db/repositories/user';
import {auth} from '../services/auth';
import {guard} from '../services/typeguards';

declare module 'fastify' {
    export interface FastifyInstance {
        validatePassword: validatePassword;
        validateUsername: validateUsername;
        db: {
            user: UserRepository
        };
        jwt: auth;
        guard: guard;
    }
}
