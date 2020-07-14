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
  photo,
} = require('../controllers/project.controller');

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
  create
);

/* 
put api/projects/update/:projectId/
update project 
private 
*/

router.put(
  '/projects/update/:projectId',
  authCheck,
  isAdmin,
  findProjectById,
  // getProject,
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

/* 
get /project/photo/:projectId/
show project photo 
public
*/
router.get('/project/photo/:projectId', findProjectById, photo);

module.exports = router;

/*
get procjets by user id
edit projects - check if all is working after front end is added
*/
