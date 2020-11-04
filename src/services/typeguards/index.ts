import fp from 'fastify-plugin';
import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import {QueryFailedError} from 'typeorm';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.decorate('guard', {
        error: (err: any): err is {error: string} => err.error !== undefined && typeof err.error === 'string',
        queryFailed: (err: any): err is (QueryFailedError & { code: string }) => err instanceof QueryFailedError
    });
};

export interface guard {
    error: (err: any) => err is {error: string},
    queryFailed: (err: any) => err is (QueryFailedError & { code: string })
}

export default fp(plugin);