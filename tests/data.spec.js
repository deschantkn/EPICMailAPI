import chai from 'chai';
import rimraf from 'rimraf';
import fs from 'fs';
import data from '../server/helpers/data';

const { expect } = chai;

describe('Data Helper', () => {
  describe('Create file', () => {
    beforeEach((done) => {
      rimraf('./server/data/mock', (e) => {
        fs.mkdir('./server/data/mock', { recursive: true }, (uErr) => {
          if (uErr) throw uErr;
          done();
        });
      });
    });

    it('it should write data to a json file', async () => {
      const result = await data.create('mock', 'testfile', { dummy: 'data' });
      expect(result).to.equal(false);
    });
  });

  describe('Read file', () => {
    it('it should read data from a json file', async () => {
      const result = await data.read('mock', 'testfile');
      expect(result).to.be.a('object');
    });
  });

  describe('Update file', () => {
    it('it should update data to a json file', async () => {
      const result = await data.update('mock', 'testfile', { dummy: 'new data' });
      expect(result).to.equal(false);
    });
  });

  describe('Delete file', () => {
    it('it should delete existing json file', async () => {
      const result = await data.delete('mock', 'testfile');
      expect(result).to.equal(false);
    });
  });
});
