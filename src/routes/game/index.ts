import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import {IGeneratorParam, IGeneratorQuery, IGeneratorReply} from './index.d';
import {IErrorReply} from '../../@types/errorReply';
import {Difficulty} from '../../@types/games';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.get<{
        Params: IGeneratorParam,
        Reply: IGeneratorReply | IErrorReply,
        Querystring: IGeneratorQuery
    }>('/millionaire', async (request, reply) => {
        try {
            const api = fastify.wordApi;
            const {difficulty, topic, questions} = request.query;
            if (!api.isValidTopic(topic)) throw new Error('Invalid topic.');
            const game = await api.generateMillionaireGame(topic, questions, Difficulty[difficulty]);
            reply.code(200);
            reply.send({
                gameId: 'millionaire',
                game
            });
        }
        catch (e) {
            reply.code(400);
            reply.send({
                error: 'Could not generate a game with these options',
                message: e.message,
            });
        }
    });

};

export default plugin;