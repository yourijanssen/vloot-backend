/**
 * An interface for managing registration-related database operations.
 * @author Youri Janssen
 */
export interface RegisterDatabaseInterface {
    createUser(email: string, password: string): Promise<number | undefined>;
}
