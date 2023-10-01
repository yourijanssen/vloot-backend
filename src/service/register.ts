import { RegisterDatabaseInterface } from '../data/interfaces/register';

/**
 * @author Youri Janssen
 */
export class RegisterService {
    public constructor(private registerDatabase: RegisterDatabaseInterface) {}

    public async createUser(
        email: string,
        password: string
    ): Promise<number | undefined> {
        return await this.registerDatabase.createUser(email, password);
    }
}
