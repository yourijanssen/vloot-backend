import express, { Router } from 'express';
import { RegisterController } from '../controller/register';
import { RegisterDatabaseInterface } from '../data/interfaces/register';
import { RegisterSequelizeDatabase } from '../data/sequelize/register';
import { RegisterSqlDatabase } from '../data/sql/register';
import { RegisterService } from '../service/register';
import { RegisterRoutes } from './routes/register';

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
        this.loadRegisterAPI(registerController);
    }

    /**
     * @param {RegisterController} registerController - loads route for the register controller.
     */
    private loadRegisterAPI(registerController: RegisterController): void {
        this.router.use(
            '/register',
            new RegisterRoutes(registerController).getRegisterRouter()
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
