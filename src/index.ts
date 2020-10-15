import register from './register';
import fastify from 'fastify';

const server = fastify({logger: true});

server.register(register);

server.listen(8080, '0.0.0.0', (err, address) => {
    if (err) {
        console.log(err);
    }
    console.log(address);
});
