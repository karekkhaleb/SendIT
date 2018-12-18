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
  let token;
  beforeAll((DONE) => {
    request.post(`${urlAuth}/signup`, {
      json: { email: 'allparcels@sendit.com', password: 'test123456' },
    }, (error, response, body) => {
      token = body.token;
      DONE();
    });
  });
  it('should give a proper status code if no key is given', (done) => {
    request.get(urlParcels, (error, response, body) => {
      expect(response.statusCode).toBe(403);
      done();
    });
  });
  it('should tell if we try to reach adm only route with regular user', (done) => {
    request.get(urlParcels, {
      headers: {
        authorization: `bearer ${token}`,
      },
    }, (error, response, body) => {
      expect(JSON.parse(body).message).toEqual('Just for admin');
      done();
    });
  });
});
