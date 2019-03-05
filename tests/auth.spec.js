import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';

const should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
  describe('POST - /auth/signup', () => {
    it('it should create a new user account', (done) => {
      const user = {
        firstName: 'Deschant',
        lastName: 'Kounou',
        email: 'deschantkounou@epic.mail',
        password: 'R72cal20',
      };

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.be.a('object');
          done();
        });
    });
  });
});
