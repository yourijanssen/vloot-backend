import express, { Request, Response, Router } from 'express';
import { RegisterController } from '../../controller/register';

/**
 * Class for managing register-related routes.
 * @author Youri Janssen
 */
export class RegisterRoutes {
    /**
     * @property router is readonly because it should not be changed after initialization.
     */
    private readonly router: Router = express.Router();

    /**
     * Creates an instance of RegisterRoutes.
     * @param {RegisterController} registerController - The controller for managing registration-related actions.
     */
    constructor(private registerController: RegisterController) {
        this.setupRoutes();
    }

    /**
     * Set up all register-related routes.
     */
    private setupRoutes(): void {
        this.router.post('/', this.createUser);
    }

    /**
     * Handles the creation of a new user.
     * @param {Request} request - The Express request object.
     * @param {Response} response - The Express response object.
     */
    private createUser = (request: Request, response: Response): void => {
        this.registerController.createUser(request, response);
    };

    /**
     * @returns {Router} The Express router for register-related routes.
     */
    public getRegisterRouter(): Router {
        return this.router;
    }
}
