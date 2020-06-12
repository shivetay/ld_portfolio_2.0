const User = require('../models/user.model');

const bcrypt = require('bcrypt');

/* user register */

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({ name, email, password });

    await user.save();

    const token = await user.getAuthToken();
    return res.json({ token, user });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

/* user login */

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    const token = await user.getAuthToken();
    console.log('toke', token);
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            msg: 'Invalid credentials',
          },
        ],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        errors: [
          {
            msg: 'Invalid credentials',
          },
        ],
      });
    }

    return res.json({ token, user });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

/* User logout */

exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send('User logout');
  } catch (err) {
    res.status(500).send('Server error');
  }
};
