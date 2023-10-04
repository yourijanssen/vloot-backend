import { User } from '../../model/user';

/**
 * An interface for managing registration-related database operations.
 * @author Youri Janssen
 */
export interface RegisterDatabaseInterface {
    createUser(userMail: string, userPassword: string): Promise<boolean>;
    getUserByMail(userMail: string): Promise<User | null>;
}
