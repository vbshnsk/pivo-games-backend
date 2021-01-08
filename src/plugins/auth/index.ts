import fp from 'fastify-plugin';
import * as jwt from 'jsonwebtoken';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import User from '../../services/db/typeorm/entities/user';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.decorate('jwt', {
        sign: (username: string, role: string) => jwt.sign({username, role}, 'placeholder'),
        verify: (token: string) => jwt.verify(token, 'placeholder', {maxAge: '1 month'})
    });
};

export interface auth {
    verify: (token: string) => Pick<User, 'username'|'role'>;
    sign: (username: string, role: string) => string;
}

export default fp(plugin);