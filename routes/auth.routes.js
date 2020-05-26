const express = require('express');
const router = express.Router();

/* import controlers */

const { registerUser, loginUser } = require('../controllers/auth.controller');

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

module.exports = router;
