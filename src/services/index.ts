import fp from 'fastify-plugin';
import authService from './auth/index';
import dbService from  './db';
import guardService from  './typeguards';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify
        .register(authService)
        .register(dbService)
        .register(guardService);
};

export default fp(plugin);