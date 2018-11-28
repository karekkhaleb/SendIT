/* eslint-disable consistent-return,no-useless-escape */
import db from '../db/conn';

const signup = async (req, res) => {
  if (!req.body.email) return res.status(400).json({ message: 'Email is required' });
  if (!req.body.password) return res.status(400).json({ message: 'Password is required' });
  if (req.body.password.trim().length < 6) {
    return res.status(400).json({ message: 'Password should be a word of more than 6 characters' });
  }
  // This regular expression is taken from stackoverflow
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  if (!emailRegex.test(req.body.email.toLowerCase())) {
    return res.status(400).json({ message: 'please enter a valid email address' });
  }
  const authData = {
    email: req.body.email,
    password: req.body.password,
  };
  const signedUpUser = await db.signup(authData);
  if (signedUpUser) {
    res.status(200).json({
      message: 'User signed up successfully',
      signedUpUser,
    });
  } else res.status(500).json({ message: 'unable to signup' });
};

const signin = async (req, res) => {
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
  } res.status(400).json({ message: 'Email or password incorrect' });
};

export default {
  signin,
  signup,
};
