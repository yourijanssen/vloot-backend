import express, { Request, Response, Router } from 'express';
import { RegisterController } from '../../controller/register';

/**
 * @author Youri Janssen
 * Class for managing register-related routes.
 */
export class RegisterRoutes {
    private readonly router: Router = express.Router();

    constructor(private registerController: RegisterController) {
        this.setupRoutes();
    }

    /**
     * Set up all register-related routes.
     */
    private setupRoutes(): void {
        this.router.post('/', this.createUser);
    }

    private createUser = (req: Request, res: Response): void => {
        this.registerController.createUser(req, res);
    };

    public getRegisterRouter(): Router {
        return this.router;
    }
}
