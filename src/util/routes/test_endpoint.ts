import express, { Request, Response, Router } from 'express';
import { TestEndpointController } from '../../controller/test_endpoint';

/**
 * A class the contains all test endpoint routes.
 * @author Thijs van Rixoort
 */
export class TestEndpointRoutes {
    /**
     * @property router is a readonly Router object which all test endpoint routes are added to.
     */
    private readonly _router: Router = express.Router();

    /**
     * Creates an instance of TestEndpointRoutes.
     * @param {TestEndpointController} testEndpointController The controller for executing test endpoint-related actions.
     */
    constructor(private testEndpointController: TestEndpointController) {
        this.setupRoutes();
    }

    /**
     * Set up all test endpoint-related routes.
     */
    private setupRoutes(): void {
        this._router.get('/', this.getTestObject);
    }

    /**
     * Executes the getTestObject method on the TestEndpointController object.
     * @param {Request} request - The Express request object.
     * @param {Response} response - The Express response object.
     */
    private getTestObject = (request: Request, response: Response): void => {
        this.testEndpointController.getTestObject(request, response);
    }

    /**
     * @returns {Router} The Express router for register-related routes.
     */
    public getRouter(): Router {
        return this._router;
    }
}
