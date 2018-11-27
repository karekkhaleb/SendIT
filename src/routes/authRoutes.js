/* eslint-disable consistent-return */
import express from 'express';
import db from '../db/conn';

const Router = express.Router();

Router.post('/signup', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'No email or password' });
  }
  const authData = {
    email: req.body.email,
    password: req.body.password,
  };
  const signedUp = db.signup(authData);
  if (signedUp) res.status(200).json({ message: 'User signed up' });
  else res.status(500).json({ message: 'unable to signup' });
});

Router.post('/signin', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'No email or password' });
  }
  const authData = {
    email: req.body.email,
    password: req.body.password,
  };
  const signedIn = await db.signin(authData);
  if (signedIn && signedIn.token) {
    return res.status(200).json({
      message: 'User signed in',
      token: signedIn.token,
    });
  } if (signedIn && signedIn.message) {
    return res.status(500).json({ message: signedIn.message });
  }
  res.status(500).json({ message: 'unable to signin' });
});

export default Router;
