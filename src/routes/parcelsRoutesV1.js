/* eslint-disable consistent-return */
import express from 'express';

import ParcelsCollection from '../classes/parcelsDataStructure';

const Router = express.Router();

Router.get('/', (req, res) => {
  res.json(ParcelsCollection.Parcels);
});

Router.post('/', (req, res) => {
  const { body } = req;
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
    userId: Number.parseInt(req.body.userId, 10),
    weight: Number.parseInt(req.body.weight, 10),
    pickupLocation: req.body.pickupLocation,
    destination: req.body.destination,
    description: req.body.description,
  });
  return res.status(201).json(createdParcel);
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

  // console.log(req.body.status);

  if (!req.body.status) return res.status(400).json({ message: 'please send the status' });
  if (req.body.status === 'delivered' || req.body.status === 'canceled') {
    // const removedParcel = ParcelsCollection.removeParcelById(parcelId);
    const updatedParcel = ParcelsCollection.changeParcelStatus(parcelId, req.body.status);
    // console.log(updatedParcel);
    if (updatedParcel) {
      res.status(202).json({ message: 'Parcel updated' });
    } else {
      res.status(500).json({ message: 'Parcel not updated' });
    }
  } else {
    return res.status(400).json({ message: 'what kind of status is that one' });
  }
});

export default Router;
