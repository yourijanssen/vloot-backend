import { RegisterService } from '../service/register';
import express from 'express';

/**
 * @author Youri Janssen
 */
export class RegisterController {
    constructor(private registerService: RegisterService) {}

    public async createUser(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        const email = req.body.email;
        const password = req.body.password;

        const result = await this.registerService.createUser(email, password);
        res.json(result);
    }
}
