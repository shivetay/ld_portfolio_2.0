const User = require('../models/user.model');

/* get my profile */

exports.myProfile = async (req, res) => {
  res.send(req.user);
  /* user is avalible from authCheck */
};

exports.findById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).json({ msg: 'User not found' });
    res.send(user._id);
    next();
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};
