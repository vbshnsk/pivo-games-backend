import fp from 'fastify-plugin';
import typeguards from './typeguards';
import auth from './auth';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import userValidator from './validators/user';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify
        .register(userValidator)
        .register(typeguards)
        .register(auth);
};

export default fp(plugin);