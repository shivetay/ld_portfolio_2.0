exports.userValidation = (req, res, next) => {
  [
    // validation
    req.check('name', 'Name is requierd').notEmpty(),
    req.check('email', 'Add valid email').isEmail().notEmpty(),
    req
      .check('password', 'Password requier min 6 or more characters')
      .isLength({
        min: 6,
      })
      .notEmpty(),
    // .matches(/\d/)
  ];
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.projectValidation = (req, res, next) => {
  [
    //validation
    req.check('title', 'Title is required').not().isEmpty(),
    req.check('description', 'Description is required').not().isEmpty(),
  ];
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

//TODO:
/*
add validation to routes and check for missing parts
 */
