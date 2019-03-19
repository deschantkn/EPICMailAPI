import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';
import { createTables, dropTables } from '../server/helpers/db';

const should = chai.should();

chai.use(chaiHttp);

describe('Auth v2', () => {
  describe('POST - /api/v2/auth/signup', () => {
    before((done) => {
      dropTables().then(() => {
        createTables().then(() => {
          done();
        });
      });
    });

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
        .post('/api/v2/auth/signup')
        .send(user2)
        .end();

      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('token');
          done();
        });
    });
  });

  describe('POST - /api/v2/auth/signin', () => {
    it('it should login an existing user with valid credentials', (done) => {
      const user = {
        email: 'deschantkounou@epic.mail',
        password: 'R72cal20',
      };

      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('token');
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
        .post('/api/v2/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
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
        .post('/api/v2/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
