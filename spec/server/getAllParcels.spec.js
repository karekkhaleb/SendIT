/* eslint-disable no-unused-vars */
import request from 'request';
import server from '../../src/app';
import {
  urlParcels,
} from './testUtils';

/**
 * Get all parcels
 */
describe('Testing the get all parcels endpoint', () => {
  it('should return a valid array', (done) => {
    request.get(urlParcels, (error, response, body) => {
      expect(JSON.parse(body).length).toBeDefined();
      done();
    });
  });

  it('should give all the available parcels', (done) => {
    request.get(urlParcels, (error, response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  it('API Response should be a valid json', (done) => {
    request.get(urlParcels, (error, response, body) => {
      expect(() => {
        JSON.parse(body);
      }).not.toThrow();
      done();
    });
  });
});
