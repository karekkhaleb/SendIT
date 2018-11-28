/* eslint-disable consistent-return */
import database from '../db/conn';

const getAll = async (req, res) => {
  const parcels = await database.getAllParcels();
  if (!parcels) {
    res.status(500).json({ message: 'sorry something went wrong' });
  } else res.status(200).json({ parcels });
};

const createParcel = async (req, res) => {
  const { body } = req;
  if (!body.userId) return res.status(400).json({ message: 'missing userId' });
  if (!body.pickupLocation) return res.status(400).json({ message: 'missing pickupLocation' });
  if (!body.destination) return res.status(400).json({ message: 'missing destination' });
  if (!body.weight) return res.status(400).json({ message: 'missing weight' });
  if (!body.description) return res.status(400).json({ message: 'missing description' });

  const newParcel = {
    userId: Number.parseInt(req.body.userId, 10),
    weight: Number.parseInt(req.body.weight, 10),
    pickupLocation: req.body.pickupLocation,
    destination: req.body.destination,
    description: req.body.description,
    price: Number.parseInt(req.body.weight, 10) * 12, // 12 is the price of 1kg in USD
    currentLocation: req.body.pickupLocation,
    status: 'pending',
  };
  const createdParccel = await database.createParcel(newParcel);

  if (createdParccel) {
    return res.status(201).json({
      message: 'Parcel created successfully',
      parcel: createdParccel,
    });
  }
  res.status(500).json({ message: 'an error occured' });
};
const getSingleParcel = async (req, res) => {
  const parcelId = Number.parseInt(req.params.parcelId, 10);
  if (typeof parcelId !== 'number') {
    return res.status(400).json({ message: 'The id should be an integer' });
  }
  const parcel = await database.getParcelById(parcelId);
  if (parcel) {
    res.status(200).json({ parcel });
  } else {
    res.status(404).json({ message: 'No match found' });
  }
};
const changeParcelStatus = async (req, res) => {
  const parcelId = Number.parseInt(req.params.parcelId, 10);
  if (!req.body.status) return res.status(400).json({ message: 'please send the status' });
  if (req.body.status === 'delivered' || req.body.status === 'canceled') {
    const parcelUpdated = await database.updateParcel(parcelId, { status: req.body.status });
    if (parcelUpdated && parcelUpdated.length) {
      res.status(202).json({
        message: 'parcel status changed successfully',
        parcel: parcelUpdated[0],
      });
    } else if (parcelUpdated && parcelUpdated.message) {
      res.status(304).json({ message: parcelUpdated.message });
    } else {
      res.status(304).json({ message: 'Parcel not updated' });
    }
  } else {
    return res.status(400).json({ message: 'what kind of status is that one' });
  }
};
const changeLocation = async (req, res) => {
  const parcelId = Number.parseInt(req.params.parcelId, 10);
  if (!req.body.currentLocation) {
    return res.status(400).json({
      message: 'please send the current location',
    });
  }

  const parcelUpdated = await database.updateParcel(parcelId, {
    currentLocation: req.body.currentLocation,
  });
  if (parcelUpdated && parcelUpdated.length) {
    res.status(202).json({
      message: 'location updated',
      parcel: parcelUpdated[0],
    });
  } else if (parcelUpdated && parcelUpdated.message) {
    res.status(400).json({ message: parcelUpdated.message });
  } else {
    res.status(500).json({ message: 'Parcel not updated' });
  }
};
const changeDestination = async (req, res) => {
  const parcelId = Number.parseInt(req.params.parcelId, 10);
  if (!req.body.destination) {
    return res.status(400).json({
      message: 'please send the new destination',
    });
  }
  const parcelUpdated = await database.updateParcel(parcelId, {
    destination: req.body.destination,
  });
  if (parcelUpdated && parcelUpdated.length) {
    res.status(202).json({
      message: 'parcel destination updated',
      parcel: parcelUpdated[0],
    });
  } else if (parcelUpdated && parcelUpdated.message) {
    res.status(400).json({ message: parcelUpdated.message });
  } else {
    res.status(500).json({ message: 'Parcel not updated' });
  }
};

export default {
  getAll,
  createParcel,
  getSingleParcel,
  changeParcelStatus,
  changeLocation,
  changeDestination,
};
