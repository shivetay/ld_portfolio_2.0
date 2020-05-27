const express = require('express');
const router = express.Router();

/* import controllers */

const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/auth.controller');
const { authCheck } = require('../middleware/auth');

/* ------------- Routes ------------ */
/* 
POST api/register
register user 
private 
*/

router.post('/register', registerUser);

/* 
POST api/login
login user 
private 
*/

router.post('/login', loginUser);

/* 
POST api/logout
logout user 
private 
*/

router.post('/logout', authCheck, logoutUser);

module.exports = router;
