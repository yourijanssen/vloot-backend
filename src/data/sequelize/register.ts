import { UserModel } from '../../util/models';
import { RegisterDatabaseInterface } from '../interfaces/register';

/**
 * @author Youri Janssen
 */
export class RegisterSequelizeDatabase implements RegisterDatabaseInterface {
    /**
     * Creates a new user with the provided email and password in the SQL database.
     */
    public async createUser(
        email: string,
        password: string
    ): Promise<number | undefined> {
        const user = await UserModel.create({ email, password } as UserModel);
        if (user.id) {
            return user.id;
        } else {
            return undefined;
        }
    }
}
