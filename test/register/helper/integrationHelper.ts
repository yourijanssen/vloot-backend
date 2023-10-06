import sinon, { SinonStub } from 'sinon';
import { RegisterService } from '../../../src/business/service/register';
import { RegisterDatabaseInterface } from '../../../src/data/interfaces/register';

/**
 * @author Youri Janssen
 * Creates a RegisterService instance with stubs for testing.
 * @returns {{
 *   registerService: RegisterService;
 *   createUserStub: SinonStub;
 *   getUserByMailStub: SinonStub;
 * }} An object containing the RegisterService instance and associated stubs.
 */
export function createRegisterServiceWithStubs(): {
    registerService: RegisterService;
    createUserStub: SinonStub;
    getUserByMailStub: SinonStub;
} {
    // Create stubs for the RegisterDatabaseInterface methods
    const registerDatabaseStub: RegisterDatabaseInterface = {
        createUser: sinon.stub(),
        getUserByMail: sinon.stub(),
    };

    // Create a RegisterService instance with the stubbed database interface
    const registerService = new RegisterService(registerDatabaseStub);

    // Extract the stubs for createUser and getUserByMail
    const createUserStub = registerDatabaseStub.createUser as SinonStub;
    const getUserByMailStub = registerDatabaseStub.getUserByMail as SinonStub;

    return {
        registerService,
        createUserStub,
        getUserByMailStub,
    };
}
