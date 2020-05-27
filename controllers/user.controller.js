/* get my profile */

exports.myProfile = async (req, res) => {
  res.send(req.user);
};
