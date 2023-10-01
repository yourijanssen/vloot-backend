/**
 * @author Youri Janssen
 */
export interface RegisterDatabaseInterface {
    createUser(email: string, password: string): Promise<number | undefined>;
}
