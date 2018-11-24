/* eslint-disable no-unused-vars */
import request from 'request';
import server from '../../src/app';
import objectsForTesting, {
  urlParcels,
} from './testUtils';


/**
 * Cancel parcel
 */
describe('Testing the cancel parcel endpoint', () => {
  it('should return a proper status code if we try to cancels a parcel that does not exist', (done) => {
    request.put(`${urlParcels}/987/cancel`, (error, response, body) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it('should give a proper status code if the parcel is canceled', (done) => {
    request.post(urlParcels, {
      json: objectsForTesting[4],
    }).on('response', () => {
      request.put(`${urlParcels}/2/cancel`, { json: { status: 'canceled' } }, (error, response, body) => {
        expect(response.statusCode).toBe(202);
        done();
      });
    });
  });

  it('should give a status code of 500 if we update a parcel that does not exist', (done) => {
    request.put(`${urlParcels}/not-present/cancel`, { json: { status: 'canceled' } }, (error, response, body) => {
      // console.log(body);
      expect(response.statusCode).toBe(500);
      done();
    });
  });

  it('should give a proper message if we send the wrong parcel status', (done) => {
    request.put(`${urlParcels}/1/cancel`, { json: { status: 'bad-status' } }, (error, response, body) => {
      // console.log(body);
      expect(body.message).toEqual('what kind of status is that one');
      done();
    });
  });
});
