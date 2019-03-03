import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

const should = chai.should();

chai.use(chaiHttp);

describe('Messages', () => {
  // Test the get all received emails endpoint
  describe('/GET messages', () => {
    it('it should fetch all received emails', (done) => {
      chai.request(app)
        .get('/messages')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
