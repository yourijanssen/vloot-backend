import { UserModel } from '../../util/models';
import { RegisterDatabaseInterface } from '../interfaces/register';

/**
 * @author Youri Janssen
 */
export class RegisterSequelizeDatabase implements RegisterDatabaseInterface {
    public async createUser(
        email: string,
        password: string
    ): Promise<number | undefined> {
        const user = UserModel.build({ email, password } as UserModel);
        await user.save();
        if (user.id) {
            return user.id;
        } else {
            return undefined;
        }
    }
}
