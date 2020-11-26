import {Connection, createConnection} from 'typeorm';
import fp from 'fastify-plugin';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import UserRepository from './repositories/user';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    let connection: Connection = null;

    fastify.decorate('db', {
        connectToDb: async (test: boolean) => {
            connection = await createConnection({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: 5432,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                entities: [__dirname + '/entities/*.js', __dirname + '/entities/*.ts'],
                synchronize: test,
            });
        },
        user: () => connection?.getCustomRepository<UserRepository>(UserRepository),
        closeConnection: () => connection?.close().then(() => null)
    });
};

export default fp(plugin);