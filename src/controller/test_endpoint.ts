import { TestEndpointService } from '../business/service/test_endpoint';
import express from 'express';

/**
 * A controller class for getting the correct data from requests, sending it to the service and sending data from the service away in a response.
 * @author Thijs van Rixoort
 */
export class TestEndpointController {
    /**
     * Creates an instance of TestEndpointController.
     * @param {TestEndpointService} testEndpointService - The service responsible for test endpoint related actions.
     */
    constructor(private testEndpointService: TestEndpointService) {}

    /**
     * Retrieves the TestEndpoint object from the database and returns it to the frontend in the response object.
     * @param {express.Request} request - The Express request object.
     * @param {express.Response} response - The Express response object to send the TestEndpoint object in.
     * @returns {Promise<void>} A promise that resolves after the TestEndpoint object is put into the response object.
     */
    public async getTestObject(
        request: express.Request,
        response: express.Response
    ): Promise<void> {
        try {
            const result = await this.testEndpointService.getTestObject();
            response.status(200).json(result.toJSON());
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                response.status(404).json(error.message);
            }
        }
    }
}
