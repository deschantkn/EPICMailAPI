import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import rimraf from 'rimraf';
import app from '../server/server';
import environment from '../server/config/environments';

const should = chai.should();

chai.use(chaiHttp);

describe('Messages', () => {
  describe('POST - /api/v1/messages', () => {
    beforeEach((done) => {
      rimraf('./server/data/messages', (e) => {
        fs.mkdir('./server/data/messages', { recursive: true }, (uErr) => {
          if (uErr) throw uErr;
          done();
        });
      });
    });

    it('it should send a message', (done) => {
      const message = {
        from: 'deschantkounou@epic.mail',
        to: 'deschantkounou@epic.mail',
        subject: 'Test mail',
        message: 'Hello world',
        status: 'sent',
        parentMessageId: 0,
      };

      chai
        .request(app)
        .post('/api/v1/messages')
        .set('token', environment.adminToken)
        .send(message)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  describe('GET /api/v1/messages', () => {
    // it('it should get all received emails for a user', (done) => {
    //   chai
    //     .request(app)
    //     .get('/api/v1/messages')
    //     .set('token', environment.adminToken)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.data.should.be.a('array');
    //       done();
    //     });
    // });

    it('it should not get any emails if there are none', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages')
        .set('token', environment.adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
