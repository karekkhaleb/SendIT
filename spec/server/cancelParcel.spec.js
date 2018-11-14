/* eslint-disable no-unused-vars */
import request from 'request';
import server from '../../src/app';
import objectsForTesting, {
  urlParcels,
} from './testUtils';


/**
 * Cancel parcel
 */
describe('Testing the cancel parcel endpoint', () => {
  it('should return a proper status code if a proper we try to cancels a parcel that does not exist', (done) => {
    request.put(`${urlParcels}/987/cancel`, (error, response, body) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });

  it('should give a proper status code if the parcel is canceled', (done) => {
    request.post(urlParcels, {
      json: objectsForTesting[4],
    }).on('response', () => {
      request.put(`${urlParcels}/1/cancel`, (error, response, body) => {
        // console.log(body);
        expect(response.statusCode).toBe(202);
        done();
      });
    });
  });
});
