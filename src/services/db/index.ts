import {createConnection, QueryFailedError} from 'typeorm';
import fp from 'fastify-plugin';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import UserRepository from './repositories/user';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    const connection = await createConnection({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [__dirname + '/entities/*.js'],
        synchronize: true
    });

    fastify.decorate('db', {
        user: connection.getCustomRepository<UserRepository>(UserRepository)
    });
};

export default fp(plugin);