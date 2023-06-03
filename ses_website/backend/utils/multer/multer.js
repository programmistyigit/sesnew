const multer = require("multer");
const path = require("path")
// const upload = multer({
//     storage:,
//     limits:2000000
// })

const storage = multer.diskStorage({
    destination:"uploads/images",
    filename:(req, file , cb)=>{
        cb(null , file.fieldname + Date.now()+path.extname(file.originalname))
    }
})

const filter = (req, file , cb)=>{
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg"){
        return cb(null , true)
    }
    cb({message:"file not supported"} , false)

}

const upload = multer({
    storage,
    fileFilter:filter
    // limits:1024*1024*1024
})

module.exports = upload