import request, { Response } from 'supertest';
import { expect } from 'chai';
import { SERVER } from '../../src/server';
import { RegisterService } from '../../src/business/service/register';
import { generateUniqueEmail } from './helper/E2EHelper';
import { RegisterSequelizeDatabase } from '../../src/data/sequelize/register';
import sinon from 'sinon';

/**
 * @author Youri Janssen
 * Integration test for the /register endpoint.
 */
describe('POST /register', () => {
    let registerService: RegisterService | null = null;

    beforeEach(() => {
      
    });

    it.only('Should return 201 when user is created', async () => {
      console.log('waiting')
      await new Promise(resolve => setTimeout(resolve, 1500, true));
      console.log('go')

      var save = sinon.stub(RegisterSequelizeDatabase.prototype, 'createUser');
      save.resolves()


      // registerService = new RegisterService(new RegisterSequelizeDatabase());
      // SERVER.routeHandler.initRegisterController(registerService);

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
