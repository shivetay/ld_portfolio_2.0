const User = require('../models/user.model');

/* get my profile */

exports.myProfile = async (req, res) => {
  res.send(req.user);
  /* user is avalible from authCheck */
};

exports.findById = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user) return res.status(400).json({ msg: 'User not found' });
    req.userProf = user;
    next();
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.read = async (req, res) => {
  try {
    let user = await User.findById(req.userProf._id);
    if (!user) return res.status(400).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
