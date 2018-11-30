/* eslint-disable no-unused-vars */
import request from 'request';
import '@babel/polyfill';
import server from '../../src/app';
import {
  urlParcels,
} from './testUtils';

/**
 * Get all parcels
 */
describe('Testing the get all parcels endpoint', () => {
  it('should give all the available parcels', (done) => {
    request.get(urlParcels, (error, response, body) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  it('API Response should be a valid array', (done) => {
    request.get(urlParcels, (error, response, body) => {
      expect(JSON.parse(body).parcels.length).toBeDefined();
      done();
    });
  });
});
