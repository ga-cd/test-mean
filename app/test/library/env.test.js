const env = require('../../library/env');

describe('Env file', () => {
    describe('get', () => {
        it('should fail getting unknown variable', () => {
            env.required('random');
            expect(env.requiredVariables.includes('random')).toBe(true);
            try {
                env.get('random', 'true', Boolean);
            } catch (e) {
                expect(e instanceof Error).toBe(true);
                expect(e.message).toBe('Environment variable "random" is required');
            }
        });
        it('should fail getting defaults variable', () => {
            env.required('bool');
            try {
                env.get('bool', 'false', Boolean);
            } catch (e) {
                expect(e instanceof Error).toBe(true);
                expect(e.message).toBe('Environment variable "bool" is required');
            }
            try {
                env.get('bool', 'true', Boolean);
            } catch (e) {
                expect(e instanceof Error).toBe(true);
                expect(e.message).toBe('Environment variable "bool" is required');
            }
            try {
                env.get('bool', true, Boolean);
            } catch (e) {
                expect(e instanceof Error).toBe(true);
                expect(e.message).toBe('Environment variable "bool" is required');
            }
        });
    });
});
