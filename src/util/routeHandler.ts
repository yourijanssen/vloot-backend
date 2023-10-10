import express, { Router } from 'express';
import { RegisterController } from '../controller/register';
import { RegisterDatabaseInterface } from '../data/interfaces/register';
import { RegisterSequelizeDatabase } from '../data/sequelize/register';
import { RegisterSqlDatabase } from '../data/sql/register';
import { RegisterService } from '../service/register';
import { RegisterRoutes } from './routes/register';
import { TestEndpointController } from '../controller/test_endpoint';
import { TestEndpointRoutes } from './routes/test_endpoint';
import { TestEndpointService } from '../business/service/test_endpoint';
import { TestEndpointDatabaseInterface } from '../data/interfaces/test_endpoint';
import { TestEndpointSequelizeDatabase } from '../data/sequelize/test_endpoint';

/**
 * @author Youri Janssen
 * Handles the initialization and assignment of routes for the Express application.
 */
export class RouteHandler {
    public router: Router = express.Router();

    /**
     * Creates a new instance of the RouteHandler class
     */
    constructor() {
        this.testRoute();
        this.initRegisterController();
        this.initTestEndpointController();
    }

    /**
     * Configures a test route for checking server health.
     */
    private testRoute(): void {
        this.router.get('/ping', (req, res) => {
            res.status(200).json('pong');
        });
    }

    /**
     * Initializes the register controller based on the database type and loads routes.
     * @param {RegisterService | null} registerService - Optional RegisterService instance to use for testing purposes.
     */
    public initRegisterController(
        registerService: RegisterService | null = null
    ): void {
        let database: RegisterDatabaseInterface;

        if (process.env.DB_TYPE === 'sql') {
            database = new RegisterSqlDatabase();
        } else {
            database = new RegisterSequelizeDatabase();
        }

        let usedService: RegisterService = new RegisterService(database);

        if (registerService !== null) {
            usedService = registerService;
        }
        const registerController = new RegisterController(usedService);
        this.loadRegisterRoutes(registerController);
    }

    /**
     * @param {RegisterController} registerController - loads route for the register controller.
     */
    private loadRegisterRoutes(registerController: RegisterController): void {
        this.router.use(
            '/register',
            new RegisterRoutes(registerController).getRegisterRouter()
        );
    }

    /**
     * Initializes the TestEndpointController based on the database type and loads routes.
     * @param {RegisterService | null} registerService - Optional RegisterService instance to use for testing purposes.
     */
    public initTestEndpointController(
        registerService: TestEndpointService | null = null
    ): void {
        const database: TestEndpointDatabaseInterface = new TestEndpointSequelizeDatabase();

        let usedService: TestEndpointService = new TestEndpointService(database);

        if (registerService !== null) {
            usedService = registerService;
        }
        const testEndpointController: TestEndpointController = new TestEndpointController(usedService);
        this.loadTestEndpointRoutes(testEndpointController);
    }

    /**
     * @param {RegisterController} testEndpointController - loads route for the register controller.
     */
    private loadTestEndpointRoutes(testEndpointController: TestEndpointController): void {
        this.router.use(
            '/test',
            new TestEndpointRoutes(testEndpointController).getRouter()
        );
    }

    /**
     * Gets the Express Router instance with the application's routes loaded.
     * @returns {Router} The Express Router instance.
     */
    public assignRouteHandler(): Router {
        return this.router;
    }
}
