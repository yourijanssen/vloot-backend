import express, { Router } from 'express';
import { RegisterController } from '../controller/register';
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
        this.initRegisterController();
    }

    /**
     * Initializes register controller based on the database type and loads routes.
     */
    private initRegisterController(): void {
        if (process.env.DB_TYPE === 'sql') {
            const registerService = new RegisterService(
                new RegisterSqlDatabase()
            );
            const registerController = new RegisterController(registerService);
            this.loadRoutes(registerController);
        } else if (process.env.DB_TYPE === 'sequelize') {
            const registerService = new RegisterService(
                new RegisterSequelizeDatabase()
            );
            const registerController = new RegisterController(registerService);
            this.loadRoutes(registerController);
        }
    }

    /**
     * Loads routes for a specific controller.
     * @param {RegisterController} registerController - The HeroController instance.
     */
    private loadRoutes(registerController: RegisterController): void {
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
