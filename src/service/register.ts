import { RegisterDatabaseInterface } from '../data/interfaces/register';

/**
 * Service class for managing registration-related operations.
 * @author Youri Janssen
 */
export class RegisterService {
    /**
     * Creates an instance of RegisterService.
     * @param {RegisterDatabaseInterface} registerDatabase - The database interface for registration-related database operations.
     */
    public constructor(private registerDatabase: RegisterDatabaseInterface) {}

    /**
     * Creates a new user with the provided email and password.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<number | undefined>} A promise that resolves to the ID of the created user or undefined if the operation fails.
     */
    public async createUser(
        email: string,
        password: string
    ): Promise<number | undefined> {
        return await this.registerDatabase.createUser(email, password);
    }
}
