import { RegisterDatabaseInterface } from '../data/interfaces/register';
import { User } from '../model/user';

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

    public async createUser(
        userMail: string,
        userPassword: string
    ): Promise<boolean | string[] | 'user_exists'> {
        const user = User.createUser(userMail, userPassword);
        const userValidation: string[] | null = user.validateUser();

        const userExists: User | null = await this.getUserByMail(userMail);
        if (userExists !== null) {
            return 'user_exists';
        }
        if (userValidation === null && userExists === null) {
            // Attempt to create the user in the database
            return await this.registerDatabase.createUser(
                userMail,
                userPassword
            );
        } else {
            return userValidation || [];
        }
    }

    /**
     * Retrieves a user by their email address from the database.
     * @param {string} userMail - The email address of the user to retrieve.
     * @returns {Promise<User | null>} A Promise that resolves with the user if found, or `null` if not found or an error occurs.
     */
    private getUserByMail(userMail: string): Promise<User | null> {
        return this.registerDatabase.getUserByMail(userMail);
    }
}
