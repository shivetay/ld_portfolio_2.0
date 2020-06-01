const express = require('express');
const router = express.Router();

/* import controllers */
const { authCheck } = require('../middleware/auth');
const { read, myProfile, findById } = require('../controllers/user.controller');
// const { addProjectToUser } = require('../controllers/project.controller');

/* ------------- Routes ------------ */
router.param('userId', findById);
/* 
get api/users/me
display my profile 
private 
*/

router.get('/users/me', authCheck, myProfile);

/* 
patch api/users/:userId
get user by id
private 
*/

router.get('/users/:userId', authCheck, read);

//TODO:
/* 
patch api/users/:userId
update my profile 
private 
*/

// router.put('/users/:userId');

/* 
patch api/users/:userId
update my profile 
private 
*/

router.get('/users/:userId', read);

module.exports = router;
