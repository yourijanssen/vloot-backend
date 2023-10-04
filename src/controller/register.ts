import { RegisterService } from '../service/register';
import express from 'express';

/**
 * @author Youri Janssen
 * Controller class for handling registration-related actions.
 */
export class RegisterController {
    /**
     * Creates an instance of RegisterController.
     * @param {RegisterService} registerService - The service responsible for registration-related operations.
     */
    constructor(private registerService: RegisterService) {}

    /**
     * Creates a new user based on the provided email and password.
     * @param {express.Request} request - The Express request object containing user data.
     * @param {express.Response} response - The Express response object to send the HTTP response.
     * @returns {Promise<void>} A Promise that resolves once the user creation process is complete.
     */
    public async createUser(
        request: express.Request,
        response: express.Response
    ): Promise<void> {
        // Extract user data from the request body
        const userMail = request.body.userMail;
        const userPassword = request.body.userPassword;

        // Attempt to create the user
        const userCreationResult: boolean | string[] | 'user_exists' =
            await this.registerService.createUser(userMail, userPassword);

        if (typeof userCreationResult === 'boolean') {
            // User created successfully
            if (userCreationResult) {
                response.status(201).json({
                    message: 'Registration successful. You can now log in.',
                });
            } else {
                // Internal server error
                response.status(500).json({
                    error: 'Internal server error.',
                    message:
                        'An internal server error occurred while processing your request.',
                });
            }
        } else if (userCreationResult === 'user_exists') {
            // User already exists
            response.status(409).json({
                error: 'User already exists.',
                message:
                    'A user with the provided email address already exists.',
            });
        } else {
            // Validation error
            response.status(400).json({
                error: 'Validation error',
                message: userCreationResult,
            });
        }
    }
}
