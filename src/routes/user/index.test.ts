import {startForTests} from '../../server';
import {FastifyInstance} from 'fastify';
let server: FastifyInstance;
const sampleUsers = [
        {username: 'usertestuser', email: 'usertestemail', role: 'admin', password: 'testpassword1'},
        {username: 'usertestuser1', email: 'usertestemail1', role: 'admin', password: 'testpassword1'},
    ],
    sampleResponses = [
        {username: 'usertestuser', email: 'usertestemail', profile: {avatarUrl: ''}},
        {username: 'usertestuser1', email: 'usertestemail1', profile: {avatarUrl: ''}},
    ];

describe('user', () => {
    beforeAll(async () => {
        server = await startForTests();
    });

    describe('PREHOOK', () => {
        test('should not accept an invalid body', async () => {
            const response = await server.inject({
                method: 'post',
                url: '/user',
                payload: {username: '', password: '', email: '', role: ''}
            });
            expect(response.statusCode).toEqual(400);
            expect(JSON.parse(response.payload))
                .toEqual({error: 'Body validation failed', message: 'Please check username and/or password'});
        });
    });

    describe('POST: /', () => {
        beforeAll(async () => {
            await server.db.user().registerUser(
                sampleUsers[0].username, sampleUsers[0].email, sampleUsers[0].role, sampleUsers[0].password
            );
        });

        test('should register a valid user', async () => {
            const response = await server.inject({
                method: 'post',
                url: '/user',
                payload: {username: 'testusername2', password: 'testpassword2', role: 'admin', email: 'testemail1'}
            });
            const payload = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(payload).toMatchObject({user: {username: 'testusername2', email: 'testemail1'}});
        });

        test('should not register a not unique user', async () => {
            const response = await server.inject({
                method: 'post',
                url: '/user',
                payload: {username: 'usertestuser', password: 'testpassword2', role: 'admin', email: 'testemail'}
            });
            const payload = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(payload).toMatchObject({
                error: 'Unique validation failed',
                message: 'User with username already exists.'
            });
        });
    });

    describe('GET: /', () => {
        beforeAll(async () => {
            await server.db.user().clear();
            for (const sampleUser of sampleUsers) {
                await server.db.user().registerUser(
                    sampleUser.username, sampleUser.email, sampleUser.role, sampleUser.password
                );
            }
        });

        test('should get all users', async () => {
            const response = await server.inject({
                method: 'get',
                url: '/user'
            });
            const payload = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(payload).toMatchObject({
                users: expect.arrayContaining(sampleResponses)
            });
        });

        afterAll(async () => {
            await server.db.user().clear();
        });
    });

    describe('GET: /:username && GET: /:username/profile', () => {
        beforeAll(async () => {
            await server.db.user().registerUser(
                sampleUsers[0].username, sampleUsers[0].email, sampleUsers[0].role, sampleUsers[0].password
            );
        });

        test('should get a single user', async () => {
            const response = await server.inject({
                method: 'get',
                url: '/user/usertestuser'
            });
            const payload = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(payload).toMatchObject({user: sampleResponses[0]});
        });

        test('should get a single user\'s profile', async () => {
            const response = await server.inject({
                method: 'get',
                url: '/user/usertestuser/profile'
            });
            const payload = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(payload).toMatchObject({profile: sampleResponses[0].profile});
        });

    });

    afterAll(async () => {
        await server.db.user().clear();
        await server.db.closeConnection();
        await server.close();
    });

});