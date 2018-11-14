/* eslint-disable no-unused-vars */
import request from 'request';
import server from '../../src/app';
import objectsForTesting, {
  urlParcels,
} from './testUtils';

/**
 * Create parcel
 */
describe('Testing the create parcel endpoint', () => {
  it('should return a proper message if wrong or no data is passed', (done) => {
    request.post(urlParcels, (error, response, body) => {
      expect(JSON.parse(body).message).toEqual('you sent wrong data');
      done();
    });
  });
  it('should return the created parcel', (done) => {
    request.post(urlParcels, {
      json: {
        userId: 7,
        weight: 21,
        pickupLocation: 'muhanga',
        destination: 'rubavu',
        description: 'water',
      },
    }, (error, response, body) => {
      expect(
        body.userId === 7
        && body.weight === 21
        && response.statusCode === 201,
      )
        .toBe(true);
      done();
    });
  });
});
