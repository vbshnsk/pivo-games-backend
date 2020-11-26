import * as fastify from 'fastify';

const schema: fastify.FastifySchema = {
    body: {
        username: {type: 'string'},
        password: {type: 'string'},
    },
    response: {
        200: {
            type: 'object',
            properties: {
                token: {type: 'string'},
            },
        },
    }
};

export default schema;