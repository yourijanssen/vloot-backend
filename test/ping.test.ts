import request from 'supertest';
import { expect } from 'chai';

import { SERVER } from '../src/server';

describe('Server Ping Test', () => {
    it('should return a "pong" response', done => {
        request(SERVER.app)
            .get('/ping')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.equal('pong');
                done();
            });
    });
});
