/* eslint-disable no-unused-vars */
import request from 'request';
import '@babel/polyfill';
import server from '../../src/app';
import {
  urlParcels,
  urlAuth,
} from './testUtils';

describe('Testing the signin endpoint', () => {
  beforeAll((DONE) => {
    request.post(`${urlAuth}/signup`, {
      json: {
        email: 'caleb@to.com',
        password: 'thisismytestpassword',
      },
    }, () => DONE());
  });
  it('should ask for email or password', () => {
    request.post(`${urlAuth}/signin`, { json: {} }, (error, response, body) => {
      expect(body.message).toEqual('No email or password');
    });
  });
  it('should  return proper message if the user email or password is incorect', (done) => {
    request.post(`${urlAuth}/signin`, {
      json: {
        email: 'caleb@me.com',
        password: 'thisismytestpassword',
      },
    }, (error, response, body) => {
      expect(body.message).toEqual('Email or password incorrect');
      done();
    });
  });
  it('should signin user if the user is registered', (done) => {
    request.post(`${urlAuth}/signin`, {
      json: {
        email: 'caleb@to.com',
        password: 'thisismytestpassword',
      },
    }, (error, response, body) => {
      expect(body.message).toEqual('User signed in');
      done();
    });
  });
});
