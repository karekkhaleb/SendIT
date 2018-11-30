/* eslint-disable no-unused-vars */
import request from 'request';
import server from '../../src/app';

it('shoul return a stutus code of 200', (Done) => {
  request.get('http://localhost:9000/', (error, response) => {
    expect(response.statusCode).toBe(200);
    Done();
  });
});
