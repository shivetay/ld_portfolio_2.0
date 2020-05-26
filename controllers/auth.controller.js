const User = require('../models/user.model');

const jwt = require('jsonwebtoken'); //generate token

/* user register */

exports.registerUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    let user = await User.findOne({ name, email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User(req.body);

    await user.save();

    user.hash_password = undefined;
    user.salt = undefined;

    return res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
