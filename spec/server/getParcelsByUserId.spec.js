/* eslint-disable no-unused-vars */
import request from 'request';
import server from '../../src/app';
import objectsForTesting, {
  urlUserParcels,
  urlParcels,
} from './testUtils';

/**
 * Get parcels by user Id
 */
describe('Testing get parcels by user id', () => {
  beforeEach((Done) => {
    request.post(urlParcels)
      .json(objectsForTesting[0], (done) => {
        done();
      });
    request.post(urlParcels)
      .json(objectsForTesting[1], (done) => {
        done();
      });
    Done();
  });

  it('should return all the parcels created by the user passed in', (done) => {
    request.get(`${urlUserParcels}/1/parcels`, (error, response, body) => {
      expect(JSON.parse(body).length).toEqual(2);
      done();
    });
  });
});
