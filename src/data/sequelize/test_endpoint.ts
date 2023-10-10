import { Test as BusinessTest } from '../../business/model/test_endpoint';
import { Test as SequelizeTest } from '../../util/database/sequelize/models/test_endpoint';
import { TestEndpointDatabaseInterface } from '../interfaces/test_endpoint';

/**
 * @author Thijs van Rixoort
 */
export class TestEndpointSequelizeDatabase implements TestEndpointDatabaseInterface {
    /**
     * Gets the TestEndpoint object from the SQL database using Sequelize.
     * @returns {Promise<BusinessTest>}
     */
    public async getTestObject(
    ): Promise<BusinessTest> {
        const testObject: SequelizeTest | null = await SequelizeTest.findOne({where: {message: "Hello, world!"}});
        if (testObject !== null) {
            return this.convertSequelizeTestToBusinessTest(testObject);
        } else {
            throw new Error("Data Access Object: The test object could not be found.");
        }
    }

    private convertSequelizeTestToBusinessTest(testObject: SequelizeTest): BusinessTest {
        const returnValue: BusinessTest = new BusinessTest(testObject.message);

        return returnValue;
    }
}
