const user = require('../models/user')

//user import library
const bcrypt = require('bcryptjs')
//token login
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    try{
        //1.Check User
 
        const {name,password} = req.body
        var Users = await user.findOne({name})
        if(Users){
            return res.send('User Already Exist!!').status(400)
        }

        //2.Encrypt
        const salt = await bcrypt.genSalt(10)
        Users = new user({
            name,
            password
        })
        Users.password = await bcrypt.hash(password,salt)
        // // name: 'bongqe',
        // password: '$2a$10$qJDlUvqgTtjQO5oqvWj.IuJGjRY5PiPEtgnt8NMVB71mcwGN0iTVe'
        // _id: new ObjectId('65bf83f4ee847e362df8ca73'

        //3.Save
       await Users.save()
       res.send('Register Success!!')
        

 

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.login = async(req,res)=>{
    try{
        // 1 Check User
        const {name,password} = req.body
        //ค้นหา User
        var Users = await user.findOneAndUpdate({name},{new:true})
        //เช็ครหัสผ่าน และเช็ค user กับ pass ว่าตรงกันไหมกับ DB
        if(Users){ //กรณีมีUser
            const isMatch = await bcrypt.compare(password,Users.password)
            if(!isMatch){ //User ถูก แต่ Pass ผิด
                 return res.status(400).send('Password Invalid!!')
            }
            // 2 Payload
            var payload = {
                Users:{
                    name : Users.name
                }
            }
            jwt.sign(payload,'jwtsecret',{expiresIn:'1d'},(err,token)=>{
                if (err) throw err;
                res.json({token,payload})
            })
        }else{ //กรณีไม่เจอ User
            res.status(400).send('User not found!!')
        }
 
        console.log(Users)
     
   
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}