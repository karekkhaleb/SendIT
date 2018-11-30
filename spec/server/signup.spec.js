/* eslint-disable no-unused-vars */
import request from 'request';
import '@babel/polyfill';
import server from '../../src/app';
import {
  urlParcels,
  urlAuth,
} from './testUtils';

describe('Testing the signup endpoint', () => {
  it('should ask for email or password', () => {
    request.post(`${urlAuth}/signup`, { json: {} }, (error, response, body) => {
      expect(body.message).toEqual('Email is required');
    });
  });
  it('should signin the user if valid email and password are given', (done) => {
    request.post(`${urlAuth}/signup`, {
      json: {
        email: 'abantu@test.com',
        password: 'anotheramazingpasswd',
      },
    }, (error, response, body) => {
      expect(body.message).toEqual('User signed up successfully');
      done();
    });
  });
});
