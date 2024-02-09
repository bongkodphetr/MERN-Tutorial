const product = require('../models/product')
const fs = require('fs')


exports.read = async (req,res)=>{
    try{

        //ค้นหาID
        const id = req.params.id
        const producted = await product.findOne({_id:id}).exec()
        res.send(producted)

    }catch(err){
        console.log(err)
        res.status(500).send('Server Err')
    }
}
exports.list = async (req,res)=>{
    try{
        const List = await product.find({}).exec()
        res.send(List)

    }catch(err){
        console.log(err)
        res.status(500).send('Server is Err')
    }
}
exports.create = async (req,res)=>{
    try{
        
        //เพิ่มรูปเข้าฐานข้อมูล
        var data = req.body
        if(req.file){

            data.file = req.file.filename
        }
        const producted = await product(data).save()
        
     
        //สร้าง และ ส่งข้อมูลไปฐานข้อมูล
      res.send(producted)

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.update = async (req,res)=>{
    try{
        //อัปเดทแก้ไขข้อมูล และ เรียลไทมส์
        const id = req.params.id
        const updated = await product.findOneAndUpdate({_id:id},req.body,{new:true}).exec()

        res.send(updated)

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.remove = async (req,res)=>{
    try{
        //ค้นหา ID และลบข้อมูล
        const id = req.params.id
        const removed = await product.findOneAndDelete({_id:id}).exec()

        //ลบรูป
        if (removed?.file) {
          await fs.unlink('./uploadimage/' + removed.file, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Remove success");
            }
          });
        }
        res.send(removed);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}
// exports.list = async (req,res) =>{
//     try{
//         res.send('Hello List')

//     }catch(err){
//         console.log(err)
//         res.status(500).send('Server Error')
//     }
// }
