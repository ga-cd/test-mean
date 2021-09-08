require('dotenv').config();
const { generateToken } = require('../../helpers/authHelper');

describe('Auth helper', () => {
    describe('generateToken', () => {
        it('should create a valid jwt token', () => {
            const token = generateToken({});
            const jwtPattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
            expect(jwtPattern.test(token)).toBe(true);
        });
    });
});
