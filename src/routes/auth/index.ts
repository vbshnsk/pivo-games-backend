import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import schema from './schema';
import {IAuthReply, IAuthBody} from './index.d';
import {IErrorReply} from '../../@types/errorReply';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.addHook<{
        Body: IAuthBody
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
        Body: IAuthBody,
        Reply: IAuthReply | IErrorReply
    }>('/', {schema}, async (request, reply) => {
        const {username, password} = request.body;
        const repo = fastify.db.user;
        const user = await repo.loginUser(username, password);
        if (!fastify.guard.error(user)) {
            const token = fastify.jwt.sign(user.username, user.role);
            reply.code(200);
            reply.send({user, token});
        }
        else {
            switch (user.error) {
                case 'Not found':
                    reply.code(404);
                    reply.send({error: 'Not found', message: 'User with this username is not found.'});
                    return;
                case 'Unauthorized':
                    reply.code(401);
                    reply.send({error: 'Unauthorized', message: 'Password does not match.'});
                    return;
            }
        }
    });
};

export default plugin;