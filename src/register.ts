import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';
import services from './services';
import plugins from  './plugins';

const plugin = async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
    fastify
        .register(plugins)
        .register(services)
        .register(routes);
};

export default fp(plugin);
