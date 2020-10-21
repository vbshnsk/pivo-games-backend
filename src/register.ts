import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import routes from './routes';
import services from './services';
import plugins from  './plugins';

export default async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
    console.log(process.env);
    fastify
        .register(plugins)
        .register(services)
        .register(routes);
};
