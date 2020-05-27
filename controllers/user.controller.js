/* get my profile */

exports.myProfile = async (req, res) => {
  res.send(req.user);
  /* user is avalible from authCheck */
};
