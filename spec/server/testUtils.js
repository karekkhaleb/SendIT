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

const urlParcels = 'http://localhost:9000/api/v1/parcels';
const urlUserParcels = 'http://localhost:9000/api/v1/parcels';

export default objectsForTesting;
export {
  urlParcels,
  urlUserParcels,
};
