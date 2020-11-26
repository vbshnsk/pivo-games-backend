import fp from 'fastify-plugin';
import dbService from  './db';
import externalServices from './external';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify
        .register(dbService)
        .register(externalServices);
};

export default fp(plugin);