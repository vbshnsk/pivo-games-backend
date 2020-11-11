import register from './register';
import fastify from 'fastify';

const server = fastify({logger: true});

export const start = async () => {
    server.register(register);
    await server.ready();
    await server.db.connectToDb(false);
    return server;
};

export const startForTests = async () => {
    server.register(register);
    await server.ready();
    await server.db.connectToDb(true);
    return server;
}

export default server;