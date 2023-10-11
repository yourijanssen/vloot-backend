import { TestEndpointDatabaseInterface } from '../../data/interfaces/test_endpoint';
import { Test } from '../model/test_endpoint';

/**
 * Service class for managing test endpoint-related actions.
 * @author Thijs van Rixoort
 */
export class TestEndpointService {
    /**
     * Creates an instance of TestEndpointService.
     * @param {TestEndpointDatabaseInterface} testEndpointDatabase - The database interface for test endpoint-related database operations.
     */
    public constructor(private testEndpointDatabase: TestEndpointDatabaseInterface) {}

    /**
     * Gets the TestEndpoint object from the database and returns it.
     * @returns {Promise<Test>} A promise that resolves to the TestEndpoint object that is stored in the database.
     */
    public async getTestObject(
    ): Promise<Test> {
        return await this.testEndpointDatabase.getTestObject();
    }
}
