const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user.model');

exports.authCheck = async (req, res, next) => {
  try {
    /* get token from header
    replace('Bearer', '') - this will remove bearer from token header
    */

    const token = req.header('Authorization').replace('Bearer', '');

    //check if no token
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Please authenticate' });
  }
};
