import ParcelCollection from '../../src/classes/parcelsDataStructure';

it('should be defined', () => {
  expect(ParcelCollection).toBeDefined();
});


describe('Testing the createNewParcel method', () => {
  it('should have the length of 0 if no parcel is created', () => {
    const collection = new ParcelCollection();
    expect(collection.length).toBe(0);
  });
  it('should return the created parcel', () => {
    const collection = new ParcelCollection();
    collection.createNewParcel(
      1,
      85,
      'gisozi',
      'nyabugogo',
      'Nothing speacial',
      25,
    );

    expect(collection.getParcelById(1).parcel).toEqual({
      userId: 1,
      parcelId: 1,
      weight: 85,
      pickupLocation: 'gisozi',
      currentLocation: 'gisozi',
      destination: 'nyabugogo',
      description: 'Nothing speacial',
      delivered: false,
      price: 25,
    });
  });
  it('should return null if the creation was not successful', () => {
    expect(new ParcelCollection().createNewParcel()).toEqual(null);
  });
  it('should return null if we search for a parcel\'s id that does not exit', () => {
    const collection = new ParcelCollection();
    expect(collection.getParcelById(1)).toBe(null);
  });
});

describe('Testing the getParcelById method', () => {
  const collection = new ParcelCollection();
  collection.createNewParcel(
    1,
    85,
    'gisozi',
    'kinamba',
    'nyabugogo',
    'Nothing speacial',
    25,
  );
  collection.createNewParcel(
    1,
    25,
    'muhanga',
    'kigali',
    'myagatare',
    'House materials',
    50,
  );

  it('should return the proper Parcel given the right parcel id', () => {
    expect(collection.getParcelById(1).parcel.parcelId).toBe(1);
  });
});
