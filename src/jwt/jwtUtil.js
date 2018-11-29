/* eslint-disable dot-notation */
import dotenv from 'dotenv';

dotenv.config();

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else res.status(403).json({ message: 'please signin' });
};

const jwtSecretWord = process.env.JWTSECRETWORD;

export default {
  ensureToken,
  jwtSecretWord,
};
