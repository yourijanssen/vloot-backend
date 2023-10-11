import express from 'express';
import { SQLDatabaseConfig } from './util/database/mysql/mysql';
import { SequelizeDatabaseConfig } from './util/database/sequelize/sequelize';
import { RouteHandler } from './util/routeHandler';
import { SequelizeDatabaseConfig } from './util/database/sequelize/sequelize';
import { SQLDatabaseConfig } from './util/sql-database';

/**
 * @author Youri Janssen
 * The main server class responsible for setting up the Express server.
 */
class Server {
    private _app: express.Application;

    /**
     * @author Youri Janssen
     * Get the Express application instance.
     */
    public get app(): express.Application {
        return this._app;
    }

    private port: number;
    private database: SQLDatabaseConfig | SequelizeDatabaseConfig;
    private _routeHandler: RouteHandler = new RouteHandler();

    /**
     * @author Youri Janssen
     * Get the route handler instance.
     */
    public get routeHandler(): RouteHandler {
        return this._routeHandler;
    }

    /**
     * @author Youri Janssen
     * Creates a new Server instance.
     */
    constructor() {
        this._app = express();

        /* The port number on which the server will listen. */
        this.port = parseInt(process.env.PORT || '3002', 10);

        // Use an environment variable to determine if it's test mode
        const isTestMode = process.env.TEST_MODE === 'true';

        // Depending on the mode, set the database instance
        this.database =
            isTestMode || process.env.DB_TYPE !== 'sql'
                ? SequelizeDatabaseConfig.getInstance()
                : SQLDatabaseConfig.getInstance();

        /* Configure middleware and route handler. */
        this.configureMiddleware();
        this.configureRouteHandler();

        // Conditionally execute syncDatabase based on test mode
        if (!isTestMode && this.database instanceof SequelizeDatabaseConfig) {
            this.startServerWithDatabaseSync();
        } else {
            this.startServer();
        }
    }

    /**
     * @author Youri Janssen
     * Configures middleware for the Express app.
     */
    private configureMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        /* CORS headers configuration */
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
     * @author Youri Janssen
     * Assigns the route handler for the Express app.
     */
    private configureRouteHandler() {
        this.app.use(this.routeHandler.assignRouteHandler());
    }

    private async startServerWithDatabaseSync() {
        /* Synchronize the database before starting the server if it's a Sequelize database. */
        if (this.database instanceof SequelizeDatabaseConfig) {
            await this.database.syncDatabase();
        }

        this.startServer();
    }
    /**
     * @author Youri Janssen
     * Starts the Express server.
     */
    public async startServer() {
        /* Start the Express server.*/
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

/* The server instance. */
export const SERVER: Server = new Server();
