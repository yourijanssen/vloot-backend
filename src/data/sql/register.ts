import { RegisterDatabaseInterface } from '../interfaces/register';
import { FieldPacket, Pool, ResultSetHeader } from 'mysql2';
import { SQLDatabaseConfig } from '../../util/sql-database';

/**
 * @author Youri Janssen
 * A class that implements the RegisterDatabaseInterface for SQL-based registration operations.
 */
export class RegisterSqlDatabase implements RegisterDatabaseInterface {
    /**
     * Creates a new user with the provided email and password in the SQL database.
     */
    public async createUser(
        email: string,
        password: string
    ): Promise<number | undefined> {
        const pool: Pool | undefined = SQLDatabaseConfig.pool;

        if (pool != null) {
            const [result]: [ResultSetHeader, FieldPacket[]] = await pool
                .promise()
                .execute<ResultSetHeader>(
                    'INSERT INTO `user` (`email`, `password`, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())',
                    [email, password]
                );

            if (result && result.insertId) {
                return result.insertId;
            }
        }
    }
}
