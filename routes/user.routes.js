const express = require('express');
const router = express.Router();

/* import controllers */
const { authCheck } = require('../middleware/auth');
const { myProfile } = require('../controllers/user.controller');

/* ------------- Routes ------------ */

/* 
get api/users/me
display my profile 
private 
*/

router.get('/users/me', authCheck, myProfile);

module.exports = router;
