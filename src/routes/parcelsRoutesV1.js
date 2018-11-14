import express from 'express';

import ParcelsCollection from '../classes/parcelsDataStructure';

const Router = express.Router();

Router.get('/', (req, res) => {
  res.json(ParcelsCollection.Parcels);
});

Router.post('/', (req, res) => {
  if (req.body) {
    const body = req.body;
    if (
      !body.userId
      || !body.pickupLocation
      || !body.destination
      || !body.weight
      || !body.description
    ) {
      return res.status(400).json({ message: 'you sent wrong data' });
    }

    const createdParcel = ParcelsCollection.createNewParcel({
      userId: req.body.userId,
      weight: req.body.weight,
      pickupLocation: req.body.pickupLocation,
      destination: req.body.destination,
      description: req.body.description,
    });

    return res.status(201).json(createdParcel);
  }
});

Router.get('/:parcelId', (req, res) => {
  const parcelId = Number.parseInt(req.params.parcelId, 10);
  const parcel = ParcelsCollection.getParcelById(parcelId);
  if (parcel) {
    res.status(200).json(parcel);
  } else {
    res.status(404).json({ message: 'No match found' });
  }
});

Router.put('/:parcelId/cancel', (req, res) => {
  const parcelId = Number.parseInt(req.params.parcelId, 10);
  const removedParcel = ParcelsCollection.removeParcelById(parcelId);
  if (removedParcel) {
    res.status(202).json({ message: 'Parcel removed' });
  } else {
    res.status(404).json({ message: 'Sorry, something went wrong' });
  }
});

export default Router;
