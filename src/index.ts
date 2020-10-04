import fastify from 'fastify';

const server = fastify();

server.get('/test', async () => {
    return 'Hello World';
});

server.listen(3000, (err, address) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is listening at ${address}`);
});