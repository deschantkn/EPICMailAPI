import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import rimraf from 'rimraf';
import app from '../server/server';

const should = chai.should();

chai.use(chaiHttp);

describe('Messages', () => {
  describe('POST - /api/v1/auth/messages', () => {
    // beforeEach((done) => {
    //   rimraf('./server/data', (e) => {
    //     fs.mkdir('./server/data/users', { recursive: true }, (uErr) => {
    //       if (uErr) throw uErr;
    //       fs.mkdir('./server/data/tokens', { recursive: true }, (tErr) => {
    //         if (tErr) throw tErr;
    //         done();
    //       });
    //     });
    //   });
    // });

    it('it should send a message', (done) => {
      const message = {
        from: '',
        to: '',
        subject: 'Andela Fellowship',
        message: 'Welcome to the Andela fellowship',
        status: '',
      };

      chai
        .request(app)
        .post('/api/v1/auth/messages')
        .send(message)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
