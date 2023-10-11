import request, { Response } from 'supertest';
import { expect } from 'chai';
import { SERVER } from '../../src/server';
import { generateUniqueEmail } from './helper/E2EHelper';
import { RegisterSequelizeDatabase } from '../../src/data/sequelize/register';
import sinon from 'sinon';
import { Roles } from '../../src/business/model/user';

/**
 * @author Youri Janssen
 * E2E test suite for the /register endpoint.
 */
describe('E2E Tests: POST /register route', async () => {
    let createUserStub: sinon.SinonStub;
    let getUserByMailStub: sinon.SinonStub;

    beforeEach(() => {
        createUserStub = sinon.stub(
            RegisterSequelizeDatabase.prototype,
            'createUser'
        );
        getUserByMailStub = sinon.stub(
            RegisterSequelizeDatabase.prototype,
            'getUserByMail'
        );
    });

    afterEach(() => {
        createUserStub.restore();
        getUserByMailStub.restore();
    });

    it('Should return 201 when user is created', async () => {
        createUserStub.resolves(true);
        getUserByMailStub.resolves(null);

        const email = generateUniqueEmail();
        const expected = {
            message: 'Registration successful. You can now log in.',
        };

        const actual: Response = await request(SERVER.app)
            .post('/register')
            .send({
                email,
                password: 'Test123!',
                type: Roles.USER,
                active: 1,
            });

        expect(actual.statusCode).equals(201);
        expect(actual.body).to.deep.equals(expected);
    });

    it('Should return 500 when a server error occurs', async () => {
        createUserStub.resolves(false);
        getUserByMailStub.resolves(null);

        const email = generateUniqueEmail();
        const expected = {
            error: 'Internal server error.',
            message:
                'An internal server error occurred while processing your request.',
        };

        const actual: Response = await request(SERVER.app)
            .post('/register')
            .send({
                email,
                password: 'Test123!',
                type: Roles.USER,
                active: 1,
            });

        expect(actual.statusCode).equals(500);
        expect(actual.body).to.deep.equals(expected);
    });
});
