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
        to: 'juniorkounou@epic.mail',
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
          res.body.data.should.be.a('object');
          done();
        });
    });
  });

  describe('GET /api/v1/messages', () => {
    let testUsertoken;

    it('it should login test user', (done) => {
      // login and get test user token
      const junior = {
        email: 'juniorkounou@epic.mail',
        password: 'mangasBoy40',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(junior)
        .end((err, res) => {
          testUsertoken = res.body.data.token;
          done();
        });
    });

    it('it should get all received emails for a user', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages')
        .set('token', testUsertoken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });

    it('it should not get any emails if there are none', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages')
        .set('token', environment.adminToken)
        .end((err, res) => {
          res.body.should.have.property('status').eql(404);
          done();
        });
    });
  });

  describe('GET /api/v1/messages/unread', () => {
    let testUsertoken;

    it('it should login test user', (done) => {
      // login and get test user token
      const junior = {
        email: 'juniorkounou@epic.mail',
        password: 'mangasBoy40',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(junior)
        .end((err, res) => {
          testUsertoken = res.body.data.token;
          done();
        });
    });

    it('it should get unread emails for a user', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages/unread')
        .set('token', testUsertoken)
        .end((err, res) => {
          res.body.data.should.be.a('array');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });
  });

  describe('GET /api/v1/messages/sent', () => {
    let testUsertoken;

    it('it should login test user', (done) => {
      // login and get test user token
      const deschant = {
        email: 'deschantkounou@epic.mail',
        password: 'R72cal20',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(deschant)
        .end((err, res) => {
          testUsertoken = res.body.data.token;
          done();
        });
    });

    it('it should get sent emails for a user', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages/sent')
        .set('token', testUsertoken)
        .end((err, res) => {
          res.body.data.should.be.a('array');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });
  });

  describe('GET /api/v1/messages/<message-id>', () => {
    let messageId;
    let testUsertoken;

    it('it should login first test user', (done) => {
      // login and get test user token
      const deschant = {
        email: 'deschantkounou@epic.mail',
        password: 'R72cal20',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(deschant)
        .end((err, res) => {
          testUsertoken = res.body.data.token;
          done();
        });
    });

    it('it should send get test message id', (done) => {
      const message = {
        from: 'deschantkounou@epic.mail',
        to: 'juniorkounou@epic.mail',
        subject: 'Test mail',
        message: 'Hello world',
        status: 'sent',
        parentMessageId: 0,
      };

      chai
        .request(app)
        .post('/api/v1/messages')
        .set('token', testUsertoken)
        .send(message)
        .end((err, res) => {
          messageId = res.body.data.id;
          done();
        });
    });

    it('it should get specific email for a user', (done) => {
      chai
        .request(app)
        .get(`/api/v1/messages/${messageId}`)
        .set('token', testUsertoken)
        .end((err, res) => {
          res.body.data.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });
  });
});
