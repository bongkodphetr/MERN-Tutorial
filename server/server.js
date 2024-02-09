const express = require('express')
const {readdirSync} = require('fs')
const connectDB = require('./config/db')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const bodyParse = require('body-parser')


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit:'10mb'}))
connectDB()


readdirSync('./route').map((r)=>app.use('/api',require('./route/'+r)))



app.listen(5000,()=>console.log('server is running in PORT 5000'))