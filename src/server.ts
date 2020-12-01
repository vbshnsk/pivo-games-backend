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
    server.get('/.well-known/acme-challenge/I03KNY77_UnL1qcJ2mJzANEKCj77lRlS6YnImOtPfu4', async (req, reply) => {
        console.log(123);
        reply.send('I03KNY77_UnL1qcJ2mJzANEKCj77lRlS6YnImOtPfu4.So1ETZrdzteYH4i7VB48niF0BD-UNFoJkURo_aHTLUo');
    });
    await server.ready();
    await server.db.connectToDb(true);
    return server;
};

export default server;