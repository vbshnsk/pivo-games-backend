import plugin from './user';
import server from '../../server';

describe('user validators', () => {

    beforeAll(async () => {
        server.register(plugin);
        await server.ready();
    });

    test('should validate correct password', async () => {
        const correctPassword = 'correctpass1';

        expect(server.validatePassword(correctPassword)).toEqual(true);
    });

    test('should not validate incorrect password', () => {
        const incorrectByLength = 'pass';
        const incorrectByNoLetter = 'incorrectpass';
        const incorrectByNoNum = '1234567890';

        expect(server.validatePassword(incorrectByLength)).not.toEqual(true);
        expect(server.validatePassword(incorrectByNoLetter)).not.toEqual(true);
        expect(server.validatePassword(incorrectByNoNum)).not.toEqual(true);
    });

    test('should validate correct username', () => {
        const correctUsernames = ['testusername1', 'another_user', 'userr', 'us.er'];

        for (const correctUsername of correctUsernames) {
            expect(server.validateUsername(correctUsername)).toEqual(true);
        }
    });

    test('should not validate incorrect username', () => {
        const incorrectByLengthS = 'u';
        const incorrectByLengthL = 'uuuuuuuuuuuuuuuuuuuuuuuuuuuuu';
        const incorrectBySymbols = '139*4;;@@@"';

        expect(server.validateUsername(incorrectByLengthS)).not.toEqual(true);
        expect(server.validateUsername(incorrectByLengthL)).not.toEqual(true);
        expect(server.validateUsername(incorrectBySymbols)).not.toEqual(true);
    });
});