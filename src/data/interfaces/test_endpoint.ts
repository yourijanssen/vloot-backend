import { Test } from "../../business/model/test_endpoint";

/**
 * This file contains an interface that the TestEndpoint data access classes have to implement.
 * We use this interface to be able to switch between data solutions, like plain MySQL and Sequelize.
 * @author Thijs van Rixoort
 */
export interface TestEndpointDatabaseInterface {
    getTestObject(): Promise<Test>
}