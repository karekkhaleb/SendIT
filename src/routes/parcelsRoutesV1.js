/* eslint-disable consistent-return */
import express from 'express';
import parcelsController from '../controllers/parcelsController';
import jwtUtil from '../jwt/jwtUtil';

const Router = express.Router();


Router.get('/', jwtUtil.ensureToken, parcelsController.getAll);

Router.post('/', jwtUtil.ensureToken,
  parcelsController.createParcel);

Router.get('/:parcelId', jwtUtil.ensureToken,
  parcelsController.getSingleParcel);

Router.put('/:parcelId/cancel', jwtUtil.ensureToken,
  parcelsController.cancelParcel);

Router.put('/:parcelId/status', jwtUtil.ensureToken,
  parcelsController.changeParcelStatus);

Router.put('/:parcelId/presentLocation', jwtUtil.ensureToken,
  parcelsController.changeLocation);

Router.put('/:parcelId/destination', jwtUtil.ensureToken,
  parcelsController.changeDestination);

export default Router;
