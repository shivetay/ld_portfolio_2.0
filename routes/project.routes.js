const express = require('express');
const router = express.Router();

const { authCheck, isAdmin } = require('../middleware/auth');
const { findById } = require('../controllers/user.controller');
const {
  create,
  read,
  update,
  addProjectToUser,
  findProjectById,
} = require('../controllers/project.controller');

/* import controllers */

/* ------------- Routes ------------ */

router.param('userId', findById);
router.param('projectId', findProjectById);

/* 
get api/projects
display all projects 
public 
*/

router.get('/projects', read);

/* 
post api/projects/create/:userId
create project 
private 
*/

router.post(
  '/projects/create/:userId',
  authCheck,
  isAdmin,
  addProjectToUser,
  create
);

/* 
post api/projects/update/:projectId/:userId
update project 
private 
*/

router.patch(
  'api/projects/update/:projectId/:userId',
  authCheck,
  isAdmin,
  findProjectById,
  addProjectToUser,
  update
);

module.exports = router;

/*
get all projects
create projects
edit projects
delete projects
*/
