const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploadimage')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, 'Arty-'+file.originalname) //ตั้งเป็ฯ file originalname
    }
  })
  
exports.upload = multer({ storage: storage }).single('file')