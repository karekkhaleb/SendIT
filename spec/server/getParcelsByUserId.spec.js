/* eslint-disable no-unused-vars */
import request from 'request';
import server from '../../src/app';
import objectsForTesting, {
  urlGetAllParcels,
  urlGetParcelsByUserIdRoot,
  urlGetSingleParcelByIdRoot,
  urlCreateParcel,
  urlCancelParcelByIdRoot,
} from './testUtils';

/**
 * Get parcels by user Id
 */
describe('Testing get parcels by user id', () => {
  beforeEach((Done) => {
    request.post(urlCreateParcel)
      .json(objectsForTesting[0], (done) => {
        done();
      });
    request.post(urlCreateParcel)
      .json(objectsForTesting[1], (done) => {
        done();
      });
    Done();
  });

  it('should return all the parcels created by the user passed in', (done) => {
    request.get(`${urlGetParcelsByUserIdRoot}/1/parcels`, (error, response, body) => {
      expect(JSON.parse(body).length).toEqual(2);
      done();
    });
  });
});
