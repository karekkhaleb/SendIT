/* eslint-disable no-unused-vars */
import request from 'request';
import server from '../../src/app';
import objectsForTesting, {
  urlParcels,
} from './testUtils';


/**
 * Get a single parcel by id
 */
describe('Testing The get parcel by id endpoint', () => {
  it('should give a proper status code if we pass the id that does not exist', (done) => {
    request.get(`${urlParcels}/8765`, (error, response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
  it('should give a proper status code if a proper id is given', (done) => {
    request.post(urlParcels, {
      json: objectsForTesting[2],
    })
      .on('response', () => {
        request.post(urlParcels, {
          json: objectsForTesting[3],
        })
          .on('response', () => {
            request.get(`${urlParcels}/2`, (error, response) => {
              expect(response.statusCode).toBe(200);
              done();
            });
          });
      });
  });
});
