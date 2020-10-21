import auth from './auth/index';
import user from './user/index';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.register(auth, {prefix: '/auth'});
    fastify.register(user, {prefix: '/user'});
};

export default plugin;