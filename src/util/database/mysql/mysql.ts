import * as mysql2 from 'mysql2';

/**
 * @author Youri Janssen
 * A utility class for managing a MySQL connection pool for SQL-based database connections.
 */
export class SQLDatabaseConfig {
    public static pool: mysql2.Pool;
    private static instance: SQLDatabaseConfig | null = null;

    /**
     * Private constructor to prevent external instantiation.
     */
    private constructor() {
        SQLDatabaseConfig.pool = this.createPool();
    }

    /**
     * Gets the singleton instance of the SQLDatabaseConfig class.
     * If an instance doesn't exist, it creates one.
     * @returns {SQLDatabaseConfig} The singleton instance of SQLDatabaseConfig.
     */
    public static getInstance(): SQLDatabaseConfig {
        if (!SQLDatabaseConfig.instance) {
            SQLDatabaseConfig.instance = new SQLDatabaseConfig();
        }
        return SQLDatabaseConfig.instance;
    }

    /**
     * Creates a MySQL connection pool using environment (.env) variables.
     * @returns {mysql2.Pool} The MySQL connection pool.
     */
    private createPool(): mysql2.Pool {
        return mysql2.createPool({
            host: process.env.HOST_RELATIONAL_DB,
            port: parseInt(process.env.PORT_RELATIONAL_DB || '3306', 10),
            user: process.env.USER_RELATIONAL_DB,
            password: process.env.PASSWORD_RELATIONAL_DB,
            database: process.env.SCHEMA_RELATIONAL_DB,
            waitForConnections: this.convertToBoolean(
                process.env.WAIT_FOR_CONNECTIONS_RELATIONAL_DB
            ),
            connectionLimit: parseInt(
                process.env.CONNECTION_LIMIT_RELATIONAL_DB || '10',
                10
            ),
            queueLimit: parseInt(
                process.env.QUEUE_LIMIT_RELATIONAL_DB || '0',
                10
            ),
        });
    }

    /**
     * Converts a string input to a boolean value.
     * @param {string | undefined} input - The string to convert.
     * @returns {boolean} The converted boolean value.
     */
    private convertToBoolean(input: string | undefined): boolean {
        return !!input && input.toLowerCase() === 'true';
    }
}
