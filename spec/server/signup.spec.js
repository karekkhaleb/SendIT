/* eslint-disable no-unused-vars */
import request from 'request';
import '@babel/polyfill';
import server from '../../src/app';
import {
  urlParcels,
  urlAuth,
} from './testUtils';

describe('Testing the signup endpoint', () => {
  it('should ask for email', () => {
    request.post(`${urlAuth}/signup`, { json: {} }, (error, response, body) => {
      expect(body.message).toEqual('Email is required');
    });
  });
  it('should ask for a valid email', () => {
    request.post(`${urlAuth}/signup`, { json: { email: 'thisisinvalidemail', password: 'thisisapassword' } }, (error, response, body) => {
      expect(body.message).toEqual('please enter a valid email address');
    });
  });
  it('should ask for a password', () => {
    request.post(`${urlAuth}/signup`, { json: { email: 'caleb@email.com' } }, (error, response, body) => {
      expect(body.message).toEqual('Password is required');
    });
  });
  it('should ask for a password with enough characters', () => {
    request.post(`${urlAuth}/signup`, { json: { email: 'caleb@email.com', password: 'short' } }, (error, response, body) => {
      expect(body.message).toEqual('Password should be a word of more than 6 characters');
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
