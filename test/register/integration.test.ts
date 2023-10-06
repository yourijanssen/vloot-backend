import sinon, { SinonStub } from 'sinon';
import { expect } from 'chai';
import { RegisterService } from '../../src/business/service/register';
import { createRegisterServiceWithStubs } from './helper/integrationHelper';
import { User } from '../../src/business/model/user';

/**
 * @author Youri Janssen
 * Integration Tests: RegisterService
 */
describe('Integration Tests: RegisterService', () => {
    let registerService: RegisterService;
    let createUserStub: SinonStub;
    let getUserByMailStub: SinonStub;

    /**
     * Initialize stubs and the RegisterService instance before each test.
     */
    beforeEach(() => {
        const stubs = createRegisterServiceWithStubs();
        registerService = stubs.registerService;
        createUserStub = stubs.createUserStub;
        getUserByMailStub = stubs.getUserByMailStub;
    });

    /**
     * Restore stubs after each test.
     */
    afterEach(() => {
        sinon.restore();
    });

    it('should create a user successfully', async () => {
        // Stub the getUserByMail method to return null (user does not exist)
        getUserByMailStub.resolves(null);

        // Stub the createUser method to return true (successful registration)
        createUserStub.resolves(true);

        const result = await registerService.createUser(
            'test@example.com',
            'Test123!'
        );

        // Assert that the result is true (successful registration)
        expect(result).to.equal(true);
    });

    it('should handle user validation errors', async () => {
        // Stub the getUserByMail method to return null (user does not exist)
        getUserByMailStub.resolves(null);

        // Stub the createUser method to return validation errors (array)
        createUserStub.resolves(['Invalid email', 'Invalid password']);

        const result = await registerService.createUser(
            'invalid-email',
            'invalid-password'
        );

        // Assert that the result is an array containing validation errors
        expect(result)
            .to.be.an('array')
            .that.includes('Invalid email', 'Invalid password');
    });

    it('should handle user existence check', async () => {
        // Stub the getUserByMail method to return an existing user
        getUserByMailStub.resolves(
            User.createUser('test@example.com', 'Test123!')
        );

        const result = await registerService.createUser(
            'test@example.com',
            'Test123!'
        );

        // Assert that the result is 'user_exists'
        expect(result).to.equal('user_exists');
    });
});
