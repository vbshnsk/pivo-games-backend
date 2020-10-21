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

const plugin = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.addHook<{
        Body: IBaseBody
    }>('preHandler', async (request, reply) => {
        const {username, password} = request.body;
        if (!(fastify.validateUsername(username) && fastify.validatePassword(password))) {
            reply.code(400);
            reply.send();
        }
    });

    fastify.post<{
        Body: IRegisterBody,
        Reply: IRegisterReply
    }>('/', {
        schema: schema.register
    }, async (request, reply) => {
        const {username, password, email, role} = request.body;
        const token = fastify.jwt.sign(username, role);
        const repo = fastify.db.user;
        const saved = await repo.registerUser(username, email, role, password);
        reply.code(201);
        reply.send({
            user: saved,
            token
        });
    });

    fastify.get<{
        Reply: IGetAllReply
    }>('/', {schema: schema.base}, async (request, reply) => {
        // get all users
    });

    fastify.get<{
        Params: IBaseParams,
        Reply: IGetOneReply
    }>('/:username', {schema: schema.base}, async (request, reply) => {
        // get a single user
    });

    fastify.get<{
        Params: IBaseParams,
        Reply: IGetProfileReply
    }>('/:username/profile', {schema: schema.base}, async  (request, reply) => {
        // get a single user's profile
    });

};

export default plugin;