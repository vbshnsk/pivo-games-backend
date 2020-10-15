import fp from 'fastify-plugin';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import userValidator from './validators/user';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.register(userValidator);
};

export default fp(plugin);