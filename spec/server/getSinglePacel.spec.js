/* eslint-disable no-unused-vars */
import request from 'request';
import server from '../../src/app';
import objectsForTesting, {
  urlGetAllParcels,
  urlGetParcelsByUserIdRoot,
  urlGetSingleParcelByIdRoot,
  urlCreateParcel,
  urlCancelParcelByIdRoot,
} from './testUtils';


/**
 * Get a single parcel by id
 */
describe('Testing The get parcel by id endpoint', () => {
  // beforeEach((done) => {
  //   request.post(urlCreateParcel, {
  //     json: objectsForTesting[3],
  //   }, () => {
  //     done();
  //   });
  // });
  it('should give a proper status code if we pass the id that does not exist', (done) => {
    request.get(`${urlGetSingleParcelByIdRoot}/8765`, (error, response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
  it('should give a proper status code if a proper id is given', (done) => {
    request.post(urlCreateParcel, {
      json: objectsForTesting[3],
    }).on('response', () => {
      request.get(`${urlGetSingleParcelByIdRoot}/2`, (error, response) => {
        expect(response.statusCode).toBe(200);
        done();
      });


      // request.put(`${urlCancelParcelByIdRoot}/1/cancel`, (error, response, body) => {
      //   // console.log(body);
      //   expect(response.statusCode).toBe(202);
      //   done();
      // });
    });
  });
});
