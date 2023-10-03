import express from 'express';
import { RouteHandler } from './util/routeHandler';
import { SequelizeDatabaseConfig } from './util/sequelize-database';
import { SQLDatabaseConfig } from './util/sql-database';

/**
 * The main server class responsible for setting up the Express server.
 * @class Server
 */
class Server {
    public app: express.Application;
    private port: number;
    private database: SQLDatabaseConfig | SequelizeDatabaseConfig;
    private routeHandler: RouteHandler = new RouteHandler();

    /**
     * Creates a new Server instance.
     */
    constructor() {
        /**
         * The Express application instance.
         */
        this.app = express();

        /**
         * The port number on which the server will listen.
         */
        this.port = parseInt(process.env.PORT || '3002', 10);

        /**
         * The database configuration based on the DB_TYPE environment variable.
         */
        this.database =
            process.env.DB_TYPE === 'sql'
                ? SQLDatabaseConfig.getInstance()
                : SequelizeDatabaseConfig.getInstance();

        /**
         * The route handler for setting up routes in the server.
         */
        this.routeHandler = new RouteHandler();

        // Configure middleware and route handler.
        this.configureMiddleware();
        this.configureRouteHandler();

        // Start the server after syncing the database.
        this.startServer();
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
     * Assigns the route handler for the Express app.
     */
    private configureRouteHandler() {
        this.app.use(this.routeHandler.assignRouteHandler());
    }

    /**
     * Starts the Express server.
     */
    private async startServer() {
        // Synchronize the database before starting the server if it's a Sequelize database.
        if (this.database instanceof SequelizeDatabaseConfig) {
            await this.database.syncDatabase();
        }

        // Start the Express server.
        this.app.listen(this.port, () => {
            console.log(
                `Server is running on localhost:${this.port} using ${
                    this.database instanceof SQLDatabaseConfig
                        ? 'MySQL'
                        : 'Sequelize'
                }`
            );
        });
    }
}

/**
 * The server instance.
 * @constant {Server}
 */
export const SERVER: Server = new Server();
