import { User } from '../../business/model/user';
import { UserModel } from '../../util/database/sequelize/models/user';
import { RegisterDatabaseInterface } from '../interfaces/register';

/**
 * @author Youri Janssen
 * Represents a Sequelize-based database implementation for user registration.
 */
export class RegisterSequelizeDatabase implements RegisterDatabaseInterface {
    /**
     * @author Youri Janssen
     * Creates a new user with the provided email and password in the SQL database.
     * @param {string} userMail - The user's email address.
     * @param {string} userPassword - The user's password.
     * @returns {Promise<boolean>} A Promise that resolves to `true` if the user was created successfully, or `false` on failure.
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
     * @author Youri Janssen
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
