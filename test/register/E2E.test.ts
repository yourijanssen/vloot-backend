import request, { Response } from 'supertest';
import { expect } from 'chai';
import { SERVER } from '../../src/server';
import { RegisterService } from '../../src/business/service/register';
import { generateUniqueEmail } from './helper/E2EHelper';
import { RegisterSequelizeDatabase } from '../../src/data/sequelize/register';

/**
 * @author Youri Janssen
 * Integration test for the /register endpoint.
 */
describe('POST /register', () => {
    let registerService: RegisterService | null = null;

    beforeEach(() => {
        registerService = new RegisterService(new RegisterSequelizeDatabase());
        SERVER.routeHandler.initRegisterController(registerService);
    });

    it('Should return 201 when user is created', async () => {
        const userMail = generateUniqueEmail();
        const expected = {
            message: 'Registration successful. You can now log in.',
        };

        const actual: Response = await request(SERVER.app)
            .post('/register')
            .send({
                userMail,
                userPassword: 'Test123!',
            });

        expect(actual.statusCode).equals(201);
        expect(actual.body).to.deep.equals(expected);
    });
});
