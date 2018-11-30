/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */


const signupValidation = (req, res, next) => {
  if (!req.body.email) return res.status(400).json({ message: 'Email is required' });
  if (!req.body.password) return res.status(400).json({ message: 'Password is required' });
  if (req.body.password.trim().length < 6) {
    return res.status(400).json({ message: 'Password should be a word of more than 6 characters' });
  }
  // This regular expression is taken from stackoverflow
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(req.body.email.toLowerCase())) {
    return res.status(400).json({ message: 'please enter a valid email address' });
  }
  next();
};

export default {
  signupValidation,
};
