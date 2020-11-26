import WordApi from './wordapi';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import fp from 'fastify-plugin';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.decorate('wordApi', new WordApi());
};

export default fp(plugin);
