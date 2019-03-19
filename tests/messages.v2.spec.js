import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Messages - V2', () => {
  describe('POST - /api/v2/messages', () => {
    let userToken;

    it('it should login test user', (done) => {
      // login and get test user token
      const user1 = {
        email: 'deschantkounou@epic.mail',
        password: 'R72cal20',
      };

      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(user1)
        .end((err, res) => {
          userToken = res.body.data[0].token;
          done();
        });
    });

    it('it should send a message', (done) => {
      const message = {
        from: 'deschantkounou@epic.mail',
        to: 'juniorkounou@epic.mail',
        subject: 'Test mail',
        message: 'Hello world',
        status: 'sent',
      };

      chai
        .request(app)
        .post('/api/v2/messages')
        .set('token', userToken)
        .send(message)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          done();
        });
    });

    it('it should not send a message missing required field', (done) => {
      const message = {
        to: 'juniorkounou@epic.mail',
        subject: 'Test mail',
        message: 'Hello world',
        status: 'sent',
      };

      chai
        .request(app)
        .post('/api/v2/messages')
        .set('token', userToken)
        .send(message)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          done();
        });
    });
  });
});
