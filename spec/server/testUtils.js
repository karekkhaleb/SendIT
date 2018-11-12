const objectsForTesting = [
  {
    userId: 1,
    weight: 85,
    pickupLocation: 'kigali',
    destination: 'musanze',
    description: 'mobile phone',
  },
  {
    userId: 1,
    weight: 41,
    pickupLocation: 'rwanda',
    destination: 'usa',
    description: 'TV set',
  },
  {
    userId: 2,
    weight: 84,
    pickupLocation: 'nairobi',
    destination: 'kampala',
    description: 'Samsung S30',
  },
  {
    userId: 4,
    weight: 88,
    pickupLocation: 'france',
    destination: 'kampala',
    description: 'Thi is in the BeforeAll, #1',
  },
  {
    userId: 5,
    weight: 88,
    pickupLocation: 'berlin',
    destination: 'kampala',
    description: 'Thi is in the BeforeAll, #2',
  },
];
const urlCreateParcel = 'http://localhost:9000/api/v1/parcels';
// Root means that it is just a small part of the url
const urlGetParcelsByUserIdRoot = 'http://localhost:9000/api/v1/users';
const urlGetSingleParcelByIdRoot = 'http://localhost:9000/api/v1/parcels';
const urlCancelParcelByIdRoot = 'http://localhost:9000/api/v1/parcels';
const urlGetAllParcels = 'http://localhost:9000/api/v1/parcels';


// beforeAll((done) => {
//   request.post(urlCreateParcel, {
//     json: objectsForTesting[3],
//   }).on('response', () => {
//     request.post(urlCreateParcel, {
//       json: objectsForTesting[4],
//     }, () => {
//       done();
//     });
//   });
// });

export default objectsForTesting;
export {
  urlCancelParcelByIdRoot,
  urlCreateParcel,
  urlGetSingleParcelByIdRoot,
  urlGetParcelsByUserIdRoot,
  urlGetAllParcels,
};
