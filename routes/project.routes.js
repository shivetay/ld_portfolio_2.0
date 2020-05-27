const express = require('express');
const router = express.Router();

const { authCheck } = require('../middleware/auth');
const { findById } = require('../controllers/user.controller');

/* import controllers */

/* ------------- Routes ------------ */

router.param('userId', findById);

/* 
get api/projects
display all projects 
public 
*/

router.get('/projects');

/* 
get api/projects
display all projects 
public 
*/

router.post('/projects/create/:userId', authCheck, (req, res) => {
  res.status(200).send(req.body);
});

module.exports = router;

/*
get all projects
create projects
edit projects
delete projects
*/
