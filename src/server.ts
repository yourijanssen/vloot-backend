/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from 'express';
import config from 'dotenv';
import { DatabaseConfig } from './util/database-config';
import { UserModel } from './util/models';
import { RouteHandler } from './util/routeHandler';

// Initialize environment variables from a .env file.
config.config();

/**
 * @author Youri Janssen
 * The main server class responsible for setting up the Express server.
 */
class Server {
    private app: express.Application;
    private port: number;
    private database: DatabaseConfig;

    /**
     * Creates a new Server instance.
     * @param {RouteHandler} routeHandler - The route handler for setting up routes in the server.
     */
    constructor(public routeHandler: RouteHandler) {
        // Initialize the database configuration based on the DB_TYPE environment variable.
        this.database = new DatabaseConfig(process.env.DB_TYPE!);

        // Initialize Express application.
        this.app = express();

        // Parse the port from the environment variable or use a default value.
        this.port = this.parsePort(process.env.PORT);

        // Configure middleware and routes.
        this.configureMiddleware();
        this.configureRoutes();
    }

    /**
     * Parses the port from an environment variable or uses a default value.
     * @param {string | undefined} portString - The port value from the environment variable.
     * @returns {number} - The parsed port number.
     */
    private parsePort(portString: string | undefined): number {
        return parseInt(portString || '3002', 10);
    }

    /**
     * Configures middleware for the Express app.
     */
    private configureMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // CORS headers configuration
        this.app.use((req, res, next) => {
            res.setHeader(
                'Access-Control-Allow-Origin',
                'http://localhost:4200'
            );
            res.setHeader(
                'Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, PATCH, DELETE'
            );
            res.setHeader(
                'Access-Control-Allow-Headers',
                'X-Requested-With,content-type'
            );
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    /**
     * Configures routes for the Express app.
     */
    private configureRoutes() {
        this.app.use(this.routeHandler.assignRouteHandler());
    }

    /**
     * Configures Sequelize and starts the server using Sequelize as the database.
     */
    public sequelizeConfig(): void {
        const sequelize = this.database.sequelize;

        // Add models and sync the database.
        sequelize!.addModels([UserModel]);
        sequelize!
            .sync() // { force: true }
            .then(() => {
                this.app.listen(this.port, () => {
                    console.log(
                        `Server is running on localhost:${this.port} using Sequelize`
                    );
                });
            })
            .catch((error: unknown) => {
                console.error('Error syncing models:', error);
            });
    }

    /**
     * Starts the server using MySQL as the database.
     */
    public sqlConfig(): void {
        this.app.listen(this.port, () => {
            console.log(
                `Server is running on localhost:${this.port} using MySQL`
            );
        });
    }
}

/**
 * Starts the server based on the DB_TYPE environment variable.
 */
function startServer(): void {
    const applicationRoutes = new RouteHandler();
    const server = new Server(applicationRoutes);

    // Choose the database configuration based on the DB_TYPE environment variable.
    process.env.DB_TYPE === 'sql'
        ? server.sqlConfig()
        : server.sequelizeConfig();
}

// Start the server.
startServer();
