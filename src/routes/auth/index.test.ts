import {startForTests} from '../../server';
import {FastifyInstance} from 'fastify';
let server: FastifyInstance;

describe('auth', () => {

    beforeAll(async () => {
        server = await startForTests();
    });

    describe('PREHOOK', () => {
        test('should not accept an invalid body', async () => {
            const response = await server.inject({
                method: 'post',
                url: '/auth',
                payload: {username: '', password: ''}
            });
            expect(response.statusCode).toEqual(400);
            expect(JSON.parse(response.payload))
                .toEqual({error: 'Body validation failed', message: 'Please check username and/or password'});
        });
    });

    describe('POST: /', () => {
        beforeAll(async () => {
            await server.db.user().registerUser(
                'testusername', 'testemail', 'admin', 'testpassword1'
            );
        });

        test('should not authorize a non-existent user', async () => {
            const response = await server.inject({
                method: 'post',
                url: '/auth',
                payload: {username: 'testusername1', password: 'testpassword1'}
            });
            const payload = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(payload).toEqual({error: 'Not found', message: 'User with this username is not found.'});
        });

        test('should not authorize a user with invalid password', async () => {
            const response = await server.inject({
                method: 'post',
                url: '/auth',
                payload: {username: 'testusername', password: 'testpassword2'}
            });
            const payload = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(401);
            expect(payload).toEqual({error: 'Unauthorized', message: 'Password does not match.'});
        });

        test('should accept a valid body and login user', async () => {
            const response = await server.inject({
                method: 'post',
                url: '/auth',
                payload: {username: 'testusername', password: 'testpassword1'}
            });
            const payload = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(payload).toHaveProperty('token');
        });

        afterAll(async () => {
            await server.db.user().clear();
        });
    });

    afterAll(async () => {
        await server.db.user().clear();
    });

});