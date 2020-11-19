import fp from 'fastify-plugin';
import dbService from  './db';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify
        .register(dbService);
};

export default fp(plugin);