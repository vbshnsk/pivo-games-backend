import fp from 'fastify-plugin';
import {FastifyError, FastifyInstance, FastifyPluginOptions} from 'fastify';

export interface validateUsername { (username: string): boolean }
export interface validatePassword { (password: string): boolean }

const plugin = (fastify: FastifyInstance, options: FastifyPluginOptions, next: (err?: FastifyError) => void) => {
    fastify.decorate('validateUsername', (username: string) => {
        const regexp = /^(?=[a-zA-Z0-9._]{4,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        return regexp.test(username);
    });

    fastify.decorate('validatePassword', (password: string) => {
        const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regexp.test(password);
    });

    next(null);
};

export default fp(plugin);