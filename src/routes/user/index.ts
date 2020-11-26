import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import * as schema from './schema';
import {
    IBaseBody,
    IBaseParams,
    IGetAllReply,
    IRegisterReply,
    IRegisterBody,
    IGetOneReply,
    IGetProfileReply
} from './index.d';
import {PG_UNIQUE_VIOLATION} from '@drdgvhbh/postgres-error-codes';
import {IErrorReply} from '../../@types/errorReply';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.register(async (fastify, options) => {

        fastify.addHook<{
            Body: IBaseBody
            Reply: IErrorReply
        }>('preHandler', async (request, reply) => {
            const {username, password} = request.body;
            if (!(fastify.validateUsername(username) && fastify.validatePassword(password))) {
                reply.code(400);
                reply.send({
                    error: 'Body validation failed',
                    message: 'Please check username and/or password'
                });
            }
        });

        fastify.post<{
            Body: IRegisterBody,
            Reply: IRegisterReply | IErrorReply
        }>('/', {
            schema: schema.register
        }, async (request, reply) => {
            const {username, password, email, role} = request.body;
            const token = fastify.jwt.sign(username, role);
            const repo = fastify.db.user();
            try {
                const saved = await repo.registerUser(username, email, role, password);
                reply.code(201);
                reply.send({
                    user: saved,
                    token
                });
            }
            catch (e) {
                if (fastify.guard.queryFailed(e)) {
                    switch (e.code) {
                        case PG_UNIQUE_VIOLATION:
                            const message =
                                `User with ${e.message.includes('uq-username') ? 'username' : 'email'} already exists.`;
                            reply.code(400);
                            reply.send({
                                error: 'Unique validation failed',
                                message
                            });
                            return;
                    }
                }
                reply.code(500);
                reply.send({
                    error: 'Unknown error',
                    message: e.message,
                });
            }
        });

    });

    fastify.get<{
        Reply: IGetAllReply | IErrorReply
    }>('/', {schema: schema.getUsers}, async (request, reply) => {
        const users = await fastify.db.user().getAll();
        reply.send({
            users
        });
    });

    fastify.get<{
        Params: IBaseParams,
        Reply: IGetOneReply | IErrorReply
    }>('/:username', {schema: schema.getUser}, async (request, reply) => {
        const {username} = request.params;
        const user = await fastify.db.user().getOne(username);
        reply.send({user});
    });

    fastify.delete<{
        Params: IBaseParams,
        Reply: void | IErrorReply
    }>('/:username', async (request, reply) => {
        const {username} = request.params;
        await fastify.db.user().deleteByUsername(username);
        reply.code(204);
        reply.send();
    });

    fastify.get<{
        Params: IBaseParams,
        Reply: IGetProfileReply | IErrorReply
    }>('/:username/profile', {schema: schema.getProfile}, async  (request, reply) => {
        const {username} = request.params;
        const profile = await fastify.db.user().getOneProfile(username);
        reply.send({profile});
    });

};

export default plugin;