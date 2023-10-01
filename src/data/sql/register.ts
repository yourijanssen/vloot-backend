import { RegisterDatabaseInterface } from '../interfaces/register';
import { Pool, ResultSetHeader } from 'mysql2';
import { DatabaseConfig } from '../../util/database-config';

export class RegisterSqlDatabase implements RegisterDatabaseInterface {
    public async createUser(
        email: string,
        password: string
    ): Promise<number | undefined> {
        const pool: Pool | null = DatabaseConfig.pool;

        if (pool != null) {
            const [result] = await pool
                .promise()
                .execute<ResultSetHeader>(
                    'INSERT INTO `user` (`email`, `password`) VALUES (?, ?)',
                    [email, password]
                );

            if (result && result.insertId) {
                return result.insertId;
            }
        }
    }
}
