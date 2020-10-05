import fastify from 'fastify';

const server = fastify();

server.get('/test', async () => {
    return 'Hello World';
});

server.get('/another_test', async () => {
    return 'Hello from another World';
});

server.listen(8080, '0.0.0.0', (err, address) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is listening at ${address}`);
});