import * as fastify from 'fastify';

const profile = {
    type: 'object',
    properties: {
        avatarUrl: {type: 'string'}
    }
};

const user = {
    type: 'object',
    properties: {
        username: {type: 'string'},
        email: {type: 'string'},
        profile
    }
};

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

export const getUsers: fastify.FastifySchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                users: {
                    type: 'array',
                    items: user
                }
            }
        },
    }
};

export const getUser: fastify.FastifySchema = {
    params: {
        username: {type: 'string'}
    },
    response: {
        200: {
            type: 'object',
            properties: {
                user
            }
        },
    }
};

export const getProfile: fastify.FastifySchema = {
    params: {
        username: {type: 'string'}
    },
    response: {
        200: {
            type: 'object',
            properties: {
                profile
            }
        },
    }
};