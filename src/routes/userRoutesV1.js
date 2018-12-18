/* eslint-disable consistent-return */
import express from 'express';
import jwtUtil from '../jwt/jwtUtil';
import userController from '../controllers/userController';

const Router = express.Router();


Router.get('/:userId/parcels', jwtUtil.ensureToken, userController.getParcelsByUserId);


export default Router;
