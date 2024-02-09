const express = require('express')
const {read,create,list,update,remove} = require('../controller/product')
const router = express.Router()
//middleware
const {auth} = require('../middleware/auth')
const {upload} = require('../middleware/upload')

router.get('/product',auth,list)
router.get('/product/:id',auth,read)
router.post('/product',auth,upload,create)
router.put('/product/:id',auth,update)
router.delete('/product/:id',auth,remove)


module.exports = router