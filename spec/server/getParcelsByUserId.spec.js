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
      .json(objectsForTesting[0]);
    request.post(urlParcels)
      .json(objectsForTesting[1]);
    Done();
  });
  it('should return all the parcels created by the user passed in', () => {
    request.get(`${urlUserParcels}/1/parcels`, (error, response, body) => {
      expect(JSON.parse(body).length).toEqual(1);
    });
  });

  it('should return an empty array when the given user does not have any parcel', () => {
    request.get(`${urlUserParcels}/no-data/parcels`, (error, response, body) => {
      expect(JSON.parse(body).length).toEqual(0);
    });
  });
  it('should give a status code of 200 when the given user does not have any parcel', () => {
    request.get(`${urlUserParcels}/no-data/parcels`, (error, response, body) => {
      expect(response.statusCode).toEqual(200);
    });
  });
});
