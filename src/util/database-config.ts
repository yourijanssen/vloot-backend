import * as mysql2 from 'mysql2';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

/**
 * A utility class for managing a MySQL relational database connection pool or Sequelize instance.
 */
export class DatabaseConfig {
    public sequelize: Sequelize | undefined;
    static pool: mysql2.Pool | null;

    /**
     * Creates a new instance of the DatabaseConfig class.
     * @param {string} databaseType - The type of database to connect to (e.g., 'sql' or 'sequelize').
     */
    public constructor(databaseType: string) {
        if (databaseType === 'sql') {
            // Create a MySQL connection pool
            DatabaseConfig.pool = mysql2.createPool(this.sqlConfig());
        } else {
            // Create a Sequelize instance
            this.sequelize = new Sequelize(this.sequelizeConfig());
        }
    }

    /**
     * Initialize the MySQL connection pool using environment (.env) variables.
     * @throws {Error} Throws an error if initialization fails.
     * @returns {mysql2.PoolOptions} The MySQL connection pool options.
     */
    private sqlConfig(): mysql2.PoolOptions {
        return {
            host: process.env.HOST_RELATIONAL_DB,
            port: parseInt(process.env.PORT_RELATIONAL_DB || '3306'),
            user: process.env.USER_RELATIONAL_DB,
            password: process.env.PASSWORD_RELATIONAL_DB,
            database: process.env.SCHEMA_RELATIONAL_DB,
            waitForConnections: this.convertToBoolean(
                process.env.WAIT_FOR_CONNECTIONS_RELATIONAL_DB
            ),
            connectionLimit: parseInt(
                process.env.CONNECTION_LIMIT_RELATIONAL_DB || '10'
            ),
            queueLimit: parseInt(process.env.QUEUE_LIMIT_RELATIONAL_DB || '0'),
        };
    }

    /**
     * Initialize the Sequelize instance using environment (.env) variables.
     * @returns {SequelizeOptions} The Sequelize options.
     */
    private sequelizeConfig(): SequelizeOptions {
        return {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST_RELATIONAL_DB,
            port: parseInt(process.env.PORT_RELATIONAL_DB || '3306'),
            username: process.env.USER_RELATIONAL_DB,
            password: process.env.PASSWORD_RELATIONAL_DB,
            database: process.env.SCHEMA_RELATIONAL_DB,
            waitForConnections: this.convertToBoolean(
                process.env.WAIT_FOR_CONNECTIONS_RELATIONAL_DB
            ),
            connectionLimit: parseInt(
                process.env.CONNECTION_LIMIT_RELATIONAL_DB || '10'
            ),
            queueLimit: parseInt(process.env.QUEUE_LIMIT_RELATIONAL_DB || '0'),
        } as SequelizeOptions;
    }

    /**
     * Converts a string input to a boolean value.
     * @param {string | undefined} input - The string to convert.
     * @returns {boolean | undefined} The converted boolean value.
     */
    private convertToBoolean(input: string | undefined): boolean | undefined {
        let result = false;

        try {
            if (input !== undefined) {
                result = JSON.parse(input.toLowerCase());
            }
        } catch (e) {
            return result;
        }
        return result;
    }
}
