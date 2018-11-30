/* eslint-disable no-unused-vars */
import request from 'request';
import '@babel/polyfill';
import server from '../../src/app';
import {
  urlParcels,
  urlAuth,
} from './testUtils';

describe('Testing cancel parcel route', () => {
  let token;

  beforeAll((DONE) => {
    request.post(`${urlAuth}/signup`, {
      json: {
        email: 'test@test.com',
        password: 'anotheramazingpasswd',
      },
    }, (error, response, body) => {
      token = body.signedUpUser.token;
      DONE();
    });
  });
  it('should should give a proper status code if not modified', (done) => {
    request.put(`${urlParcels}/47852/cancel`, {
      json: { status: 'canceled' },
      headers: {
        "authorization": 'bearer ' + token,
      },
    }, (error, response, body) => {
      expect(response.statusCode).toBe(304);
      done();
    });
  });

  it('should ask to signin if not token is given', (done) => {
    request.put(`${urlParcels}/1/cancel`, (error, response, body) => {
      expect(JSON.parse(body).message).toEqual('please signin');
      done();
    });
  });
});
