import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import rimraf from 'rimraf';
import app from '../server/server';

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
        .send(message)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
