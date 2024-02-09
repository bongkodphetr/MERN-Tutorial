//เชื่อมต่อฐานข้อมูล
const mongoose = require('mongoose')

const connectDB = async(req,res)=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/bong')
        console.log('DB Connected')

    }catch(err){
        console.log(err)
        res.status(500).send('server err')
    }
}

module.exports = connectDB