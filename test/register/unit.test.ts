import { expect } from 'chai';
import { User } from '../../src/business/model/user';

/**
 * @author Youri Janssen
 * Unit test suite for the User class.
 */
describe('User class Test suite', () => {
    it('should create a new User instance', () => {
        const user = User.createUser('test@example.com', 'Test123!');
        expect(user).to.be.an.instanceOf(User);
        expect(user.validateUser()).to.be.null;
    });

    it('should correctly validate a valid user', () => {
        const user = User.createUser('test@example.com', 'Test123!');
        const validationErrors = user.validateUser();
        expect(validationErrors).to.be.null;
    });

    it('should correctly invalidate a invalid user', () => {
        const user = User.createUser('test@examplecom', 'Test123');
        const validationErrors = user.validateUser();
        expect(validationErrors).to.deep.equal([
            'Invalid password',
            'Invalid email',
        ]);
    });

    it('should hash a password', async () => {
        const plainPassword = 'Test123!';
        const saltRounds = 10;

        const hashedPassword = await User.hashPassword(
            plainPassword,
            saltRounds
        );
        expect(hashedPassword).to.be.a('string');
    });
});
