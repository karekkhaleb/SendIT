/* eslint-disable consistent-return */
import express from 'express';
import authController from '../controllers/authController';
import validations from '../classes/validations';

const Router = express.Router();

Router.post('/signup', validations.signupValidation, authController.signup);

// Router.post('/signup/admin', validations.signupValidation, authController.adminSignup);

Router.post('/signin', authController.signin);


export default Router;
