import { validatePassword, validateUsername } from '../plugins/validators/user';
import UserRepository from '../services/db/typeorm/repositories/user';
import {auth} from '../plugins/auth';
import {guard} from '../plugins/typeguards';
import WordApi from '../services/external/wordapi';
import IDatabaseConnection from "../services/db/interface";

declare module 'fastify' {
    export interface FastifyInstance {
        validatePassword: validatePassword;
        validateUsername: validateUsername;
        db: IDatabaseConnection;
        wordApi: WordApi;
        jwt: auth;
        guard: guard;
    }
}
