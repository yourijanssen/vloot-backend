import { RegisterService } from '../service/register';
import express from 'express';

/**
 * Controller class for handling registration-related actions.
 * @author Youri Janssen
 */
export class RegisterController {
    /**
     * Creates an instance of RegisterController.
     * @param {RegisterService} registerService - The service responsible for registration-related operations.
     */
    constructor(private registerService: RegisterService) {}

    /**
     * Handles the creation of a new user.
     * @param {express.Request} request - The Express request object containing user registration data.
     * @param {express.Response} response - The Express response object to send the registration result.
     * @returns {Promise<void>} A promise that resolves after processing the registration request.
     */
    public async createUser(
        request: express.Request,
        response: express.Response
    ): Promise<void> {
        const email = request.body.email;
        const password = request.body.password;
        const result = await this.registerService.createUser(email, password);
        response.json(result);
    }
}
