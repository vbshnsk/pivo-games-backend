import fp from 'fastify-plugin';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import TypeOrmConnection from "./typeorm";

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.decorate('db', new TypeOrmConnection());
};

export default fp(plugin);