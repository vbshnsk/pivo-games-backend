import {FastifyInstance, FastifyPluginOptions} from 'fastify';
import jsonwebtoken from 'jsonwebtoken';
import schema from './schema';
import {IAuthReply, IAuthBody} from './index.d';

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.addHook<{
        Body: IAuthBody
    }>('preHandler', async (request, reply) => {
        const {username, password} = request.body;
        if (!(fastify.validateUsername(username) && fastify.validatePassword(password))) {
            reply.code(400);
            reply.send();
        }
    });

    fastify.post<{
        Body: IAuthBody,
        Reply: IAuthReply
    }>('/', {schema}, async (request, reply) => {
        const {username, password} = request.body;
        const repo = fastify.db.user;
        const user = await repo.loginUser(username, password);
        const token = fastify.jwt.sign(user.username, user.role);
        if (user) {
            reply.code(200);
            reply.send({user, token});
        }
        else {
            reply.code(401);
            reply.send();
        }
    });
};

export default plugin;