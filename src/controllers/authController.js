/* eslint-disable consistent-return,no-useless-escape */
import db from '../db/conn';

class AuthController {
  signup = async (req, res) => {
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

  adminSignup = async (req, res) => {
    const authData = {
      email: req.body.email,
      password: req.body.password,
    };
    const signedUpUser = await db.adminSignup(authData);
    if (signedUpUser) {
      res.status(200).json({
        message: 'User signed up successfully',
        signedUpUser,
      });
    } else res.status(500).json({ message: 'unable to signup' });
  };

  signin = async (req, res) => {
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
}

export default new AuthController();
