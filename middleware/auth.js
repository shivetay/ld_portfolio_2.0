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

    /*
    decoded contains _id as a payload in token. Id is from getAuthToken */
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

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== config.get('roleSecret')) {
      return res.status(403).json({
        errors: [
          {
            msg: 'No Admin rights. Access Denied!!',
          },
        ],
      });
    }
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Forbidden access' });
  }
};
