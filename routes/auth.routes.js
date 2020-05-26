const express = require('express');
const router = express.Router();

/* import controlers */

const { registerUser } = require('../controllers/auth.controller');

/* 
POST api/register
register user 
public 
*/

router.post('/register', registerUser);

module.exports = router;
