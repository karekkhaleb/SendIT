/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import database from '../db/conn';
import jwtUtil from '../jwt/jwtUtil';

class ParcelController {
  getAll = async (req, res) => {
    const credentials = jwt.decode(req.token);
    if (credentials.data.user_role !== 'admin') {
      return res.status(403).json({ message: 'Just for admin' });
    }
    const parcels = await database.getAllParcels();
    if (!parcels) {
      res.status(500).json({ message: 'sorry something went wrong' });
    } else res.status(200).json({ parcels });
  };

  createParcel = async (req, res) => {
    const { body } = req;
    if (!body.pickupLocation) return res.status(400).json({ message: 'missing pickupLocation' });
    if (!body.destination) return res.status(400).json({ message: 'missing destination' });
    if (!body.weight) return res.status(400).json({ message: 'missing weight' });
    if (!body.description) return res.status(400).json({ message: 'missing description' });

    const newParcel = {
      userId: jwt.decode(req.token).data.id,
      weight: Number.parseInt(req.body.weight, 10),
      pickupLocation: req.body.pickupLocation,
      destination: req.body.destination,
      description: req.body.description,
      price: Number.parseInt(req.body.weight, 10) * 12, // 12 is the price of 1kg in USD
      currentLocation: req.body.pickupLocation,
      status: 'pending',
    };
    const createdParcel = await database.createParcel(newParcel);

    if (createdParcel) {
      return res.status(201).json({
        message: 'Parcel created successfully',
        parcel: createdParcel,
      });
    }
    res.status(500).json({ message: 'an error occured' });
  };

  getSingleParcel = async (req, res) => {
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

  changeParcelStatus = async (req, res) => {
    let tokenData = null;
    jwt.verify(req.token, jwtUtil.jwtSecretWord, (err, data) => {
      if (err) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      tokenData = data;
    });

    // return res.send(tokenData.data.user_role);
    if (tokenData.data.user_role !== 'admin') {
      return res.status(403).json({ message: 'Only Admin is authorized' });
    }
    const parcelId = Number.parseInt(req.params.parcelId, 10);
    if (!req.body.status) return res.status(400).json({ message: 'please send the status' });
    const status = req.body.status.trim();
    if (status === 'delivered') {
      const parcelUpdated = await database.updateParcel(parcelId, { status });
      if (parcelUpdated && parcelUpdated.length) {
        res.status(202).json({
          message: 'parcel status changed successfully',
          parcel: parcelUpdated[0],
        });
      } else if (parcelUpdated && parcelUpdated.message) {
        res.status(403).json({ message: parcelUpdated.message });
      } else {
        res.status(304).json({ message: 'Parcel not updated' });
      }
    } else {
      return res.status(400).json({ message: 'what kind of status is that one' });
    }
  };

  cancelParcel = async (req, res) => {
    jwt.verify(req.token, jwtUtil.jwtSecretWord, (err) => {
      if (err) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
    });

    const parcelId = Number.parseInt(req.params.parcelId, 10);
    if (!req.body.status) return res.status(400).json({ message: 'please send the status' });
    if (req.body.status === 'canceled') {
      const parcelUpdated = await database.updateParcel(parcelId, { status: req.body.status });
      if (parcelUpdated && parcelUpdated.length) {
        res.status(202).json({
          message: 'parcel canceled successfully',
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

  changeLocation = async (req, res) => {
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

  changeDestination = async (req, res) => {
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
}

export default new ParcelController();
