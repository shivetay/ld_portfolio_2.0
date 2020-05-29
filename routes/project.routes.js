const express = require('express');
const router = express.Router();

const { authCheck, isAdmin } = require('../middleware/auth');
const { findById } = require('../controllers/user.controller');
const {
  create,
  getAll,
  addProjectToUser,
} = require('../controllers/project.controller');

/* import controllers */

/* ------------- Routes ------------ */

router.param('userId', findById);

/* 
get api/projects
display all projects 
public 
*/

router.get('/projects', getAll);

/* 
post api/projects/create/:userId
create project 
public 
*/

router.post(
  '/projects/create/:userId',
  authCheck,
  isAdmin,
  addProjectToUser,
  create
);

module.exports = router;

/*
get all projects
create projects
edit projects
delete projects
*/
