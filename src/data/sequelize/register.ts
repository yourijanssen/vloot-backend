import { User } from '../../model/user';
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
        userMail: string,
        userPassword: string
    ): Promise<boolean> {
        const saltRounds = 10; // You can adjust the number of salt rounds as needed

        try {
            const hashedPassword = await User.hashPassword(
                userPassword,
                saltRounds
            );

            await UserModel.create({
                userMail,
                userPassword: hashedPassword,
            } as UserModel);

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Find a user by email address.
     * @param {string} userMail - The email address to search for.
     * @returns {Promise<User | null>} A Promise that resolves with the user if found, or `null` if not found.
     */
    public async getUserByMail(userMail: string): Promise<User | null> {
        const user = await UserModel.findOne({
            where: {
                userMail: userMail,
            },
        });
        if (user === null) {
            return null;
        }
        return User.createUser(user.userMail, user.userPassword);
    }
}
