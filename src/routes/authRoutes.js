/* eslint-disable consistent-return */
import express from 'express';
import authController from '../controllers/authController';

const Router = express.Router();

Router.post('/signup', authController.signup);

Router.post('/signin', authController.signin);

export default Router;
