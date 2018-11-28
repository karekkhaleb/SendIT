/* eslint-disable consistent-return */
import express from 'express';
import parcelsController from '../controllers/parcelsController';

const Router = express.Router();

Router.get('/', parcelsController.getAll);

Router.post('/', parcelsController.createParcel);

Router.get('/:parcelId', parcelsController.getSingleParcel);

Router.put('/:parcelId/cancel', parcelsController.changeParcelStatus);

Router.put('/:parcelId/presentLocation', parcelsController.changeLocation);

Router.put('/:parcelId/destination', parcelsController.changeDestination);

export default Router;
