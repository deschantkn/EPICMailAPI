import chai from 'chai';
import assert from 'assert';
import generateId from '../src/helpers/generateId';

describe('generateId', () => {
  it('it should generate random fixed length integer', (done) => {
    assert.equal(typeof (generateId(10)), 'number');
    done();
  });
});
