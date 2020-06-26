const express = require('express');
const router = express.Router();

const { authCheck, isAdmin } = require('../middleware/auth');
const { findById } = require('../controllers/user.controller');
const {
  create,
  read,
  update,
  getProject,
  addProjectToUser,
  findProjectById,
  remove,
} = require('../controllers/project.controller');
const fileUpload = require('../middleware/fileUpload');

/* import controllers */

/* ------------- Routes ------------ */

router.param('userId', findById);
// router.param('projectId', findProjectById);

/* 
get api/projects
display all projects 
public 
*/

router.get('/projects', read);

/* 
get api/projects/:projectId
display one project
public 
*/

router.get('/projects/:projectId', findProjectById, getProject);

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
  fileUpload.single('photo'),
  create
);

/* 
post api/projects/update/:projectId/
update project 
private 
*/

router.patch(
  '/projects/update/:projectId',
  authCheck,
  isAdmin,
  findProjectById,
  fileUpload.any(),
  update
);

/* 
post /projects/delete/:projectId/
delete project 
private 
*/

router.delete(
  '/projects/delete/:projectId',
  authCheck,
  isAdmin,
  findProjectById,
  remove
);

module.exports = router;

/*
get all projects
get procjets by user id
create projects
edit projects - check if all is working after front end is added
delete projects
*/
