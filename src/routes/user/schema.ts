import * as fastify from 'fastify';

export const register: fastify.FastifySchema = {
    body: {
        username: {type: 'string'},
        password: {type: 'string'},
        email: {type: 'string'}
    },
    response: {
        200: {
            type: 'object'
        },
    }
};

export const base: fastify.FastifySchema = {
    response: {
        200: {
            type: 'object'
        },
    }
};