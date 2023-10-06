import { RegisterDatabaseInterface } from '../interfaces/register';
import { User } from '../../business/model/user';
import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from 'mysql2';
import { SQLDatabaseConfig } from '../../util/database/mysql/mysql';

/**
 * @author Youri Janssen
 * A class that implements the RegisterDatabaseInterface for MySQL-based registration operations.
 */
export class RegisterMysqlDatabase implements RegisterDatabaseInterface {
    /**
     * @author Youri Janssen
     * Creates a new user with the provided email and password in the MySQL database.
     * @param {string} userMail - The user's email address.
     * @param {string} userPassword - The user's password.
     * @returns {Promise<boolean>} A Promise that resolves with `true` if successful, or `false` if an error occurs.
     */
    public async createUser(
        userMail: string,
        userPassword: string
    ): Promise<boolean> {
        const pool: Pool | undefined = SQLDatabaseConfig.pool;
        const saltRounds = 10; // You can adjust the number of salt rounds as needed

        if (pool != null) {
            try {
                const hashedPassword = await User.hashPassword(
                    userPassword,
                    saltRounds
                );

                const [result]: [ResultSetHeader, FieldPacket[]] = await pool
                    .promise()
                    .execute<ResultSetHeader>(
                        'INSERT INTO `user` (`userMail`, `userPassword`, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())',
                        [userMail, hashedPassword] // Use the hashed password
                    );

                if (result && result.affectedRows > 0) {
                    return true;
                }
            } catch (error) {
                console.error('Error creating user:', error);
            }
        }

        return false;
    }

    /**
     * @author Youri Janssen
     * Find a user by email address in the MySQL database.
     * @param {string} userMail - The email address to search for.
     * @returns {Promise<User | null>} A Promise that resolves with the user if found, or `null` if not found.
     */
    public async getUserByMail(userMail: string): Promise<User | null> {
        const pool: Pool | undefined = SQLDatabaseConfig.pool;

        if (pool != null) {
            try {
                const [rows]: [RowDataPacket[], FieldPacket[]] = await pool
                    .promise()
                    .query<RowDataPacket[]>(
                        'SELECT * FROM `user` WHERE `userMail` = ? LIMIT 1',
                        [userMail]
                    );

                if (rows.length > 0) {
                    const userData: RowDataPacket = rows[0];
                    return User.createUser(userData.email, userData.password);
                }
            } catch (error) {
                console.error('Error fetching user by email:', error);
            }
        }

        return null;
    }
}
