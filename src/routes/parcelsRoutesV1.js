import express from 'express';

import ParcelsCollection from '../classes/parcelsDataStructure';

const Router = express.Router();
const myParcels = new ParcelsCollection();


Router.get('/', (req, res) => {
  // database.createNewParcel();
  res.json(myParcels);
});

Router.post('/', (req, res) => {
  /**
   * =====Setting up the price====
   * The currency is $
   * 1kg of weight cost 12$
   */
  const price = req.body.weight * 12;

  const createdParcel = myParcels.createNewParcel(
    req.body.userId,
    req.body.weight,
    req.body.pickupLocation,
    req.body.destination,
    req.body.description,
    price,
  );

  if (createdParcel) {
    res.status(201).json(createdParcel);
  } else {
    res.status(400).json({ message: 'Sorry, something might be wrong with your data' });
  }
});

Router.get('/:parcelId', (req, res) => {
  const parcel = myParcels.getParcelById(Number.parseInt(req.params.parcelId, 10));
  if (parcel) {
    res.status(200).json(parcel.parcel);
  } else {
    res.status(404).json({ message: 'No match found' });
  }
});

Router.put('/:parcelId/cancel', (req, res) => {
  const parcelId = Number.parseInt(req.params.parcelId, 10);
  const removedParcel = myParcels.removeParcelById(parcelId);
  if (removedParcel) {
    res.status(202).json({ message: 'Parcel removed' });
  } else {
    res.status(404).json({ message: 'Sorry, something went wrong' });
  }
});

export default Router;
export { myParcels };
