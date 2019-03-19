import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
  describe('POST - /api/v1/auth/signup', () => {
    it('it should create a new user account', (done) => {
      const user = {
        firstName: 'Deschant',
        lastName: 'Kounou',
        email: 'deschantkounou@epic.mail',
        password: 'R72cal20',
      };

      // Second user to enable subsequent tests
      const user2 = {
        firstName: 'Junior',
        lastName: 'Kounou',
        email: 'juniorkounou@epic.mail',
        password: 'mangasBoy40',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user2)
        .end();

      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          done();
        });
    });
  });

  describe('POST - /api/v1/auth/signin', () => {
    it('it should login an existing user with valid credentials', (done) => {
      const user = {
        email: 'deschantkounou@epic.mail',
        password: 'R72cal20',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('token');
          done();
        });
    });

    it('it should not login with invalid email', (done) => {
      const user = {
        email: 'desfdchantkodfunou@epic.mail',
        password: 'R72cal20',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('it should not login with invalid password', (done) => {
      const user = {
        email: 'deschantkounou@epic.mail',
        password: 'R72cafdl20s',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
