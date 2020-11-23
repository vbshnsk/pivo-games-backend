import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import fp from 'fastify-plugin';
import routes from './routes';
import services from './services';
import plugins from  './plugins';
import fastifyCors from 'fastify-cors';

const plugin = async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
    fastify
        .register(plugins)
        .register(services)
        .register(routes)
        .register(fastifyCors, {
            origin: '*',
            methods: 'GET,POST,PUT,DELETE,OPTIONS',
            allowedHeaders: 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        });
};

export default fp(plugin);
