const router = require('express').Router()
const upload = require("../../utils/multer/multer")
const schema = require("./schema/schema")
const fs = require("fs")
const { post, deleteById, putByID } = require('./controller/controller')
const secure = require('../../middleware/secure')
const admin = require('../../middleware/admin')
const root = process.env.root
router.post("/" , secure , upload.single("avatar") , post)

router.get("/all" , async (req, res)=>{
    const allPosts = await schema.find().lean()
    res.send({post:allPosts.reverse() , isAdmin:req.admin})
})

router.get("/one/:id" , async (req, res)=>{
    const post = await schema.findById(req.params.id)
    if(post) return res.send(post)
    res.send({status :'post topilmadi'})
})



router.get("/file/:file" ,async (req, res)=>{
    const file =await new Promise((resolve , reject)=>{
        fs.readFile("./uploads/images/"+req.params.file , "utf8" , (err , data)=>{
            if(err) return reject(false);
            resolve(true)
        })
    })
    
    if(file) return res.sendFile("/uploads/images/"+req.params.file , {root})
    res.status(401).send()
})

router.use(secure).route("/:id").delete(deleteById).put(upload.single("avatar") , putByID)

module.exports  = router