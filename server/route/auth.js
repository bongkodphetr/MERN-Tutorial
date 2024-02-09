const express = require('express')
const {register,login} = require('../controller/user')

const router = express.Router()

//http://localhost:5000/api/register/
router.post('/register',register)
router.post('/login',login)
module.exports = router