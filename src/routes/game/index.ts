import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import {generatorSchema} from './schema';
import {IGeneratorParam, IGeneratorQuery, IGeneratorReply} from './index.d';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.get<{
        Params: IGeneratorParam,
        Reply: IGeneratorReply,
        Querystring: IGeneratorQuery
    }>('/', {schema: generatorSchema},async (request, reply) => {
        return null;
    });

};

export default plugin;