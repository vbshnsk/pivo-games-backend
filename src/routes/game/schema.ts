import * as fastify from 'fastify';

export const generatorSchema: fastify.FastifySchema = {
    params: {
        gameId: {type: 'string'}
    },
    querystring: {
        difficulty: 'string',
        topic: 'string',
        questions: 'number'
    }
};
