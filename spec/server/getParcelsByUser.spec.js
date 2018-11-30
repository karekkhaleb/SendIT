/* eslint-disable no-unused-vars */
import request from 'request';
import '@babel/polyfill';
import server from '../../src/app';
import {
  urlParcels,
  urlAuth,
  urlUserParcels,
} from './testUtils';

describe('Testing the route to get parcels by UserId', () => {
  it('should give an empty array if that user does not have a parcel', (done) => {
    request.get(`${urlUserParcels}/nouser/parcels`, (error, Response, body) => {
      expect(Response.statusCode).toBe(200);
      done();
    });
  });
});
