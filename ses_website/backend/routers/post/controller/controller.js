const joi  = require('../validate/validate')
const _ = require("lodash")
const schema = require("../schema/schema")
const fs = require("fs")
const deleteById = async (req, res)=>{
    const post = await schema.findByIdAndDelete(req.params.id)
    if(post) return res.send({status:"succes"})
    res.send({status:"err" , message:"post topilmadi"})
}

const putByID = async (req, res)=>{
    const validat = joi.validate({file:req?.file?.originalname , ..._.pick(req.body , ["description" , "title"])})
    if(validat.error) throw new Error("validatsiyadan otmadi " + validat.error.details[0].message)
    
    const post = await schema.findById(req.params.id)
    if(!post) return res.send({status:"err" , message:"post topilmadi"})

    fs.rm("./uploads/images/"+post.file , (err)=>{if(err){console.log(err+"")}})

    const updatePost = await schema.findByIdAndUpdate(post._id , {..._.pick(validat.value , ["description" , "title"]) , file:req.file.filename}).lean()
    const newPost = await schema.findById(updatePost._id).lean()

    res.send({ newPost })

}
const post = async (req, res)=>{
    console.log(req.body);
    const validat = joi.validate({file:req?.file?.originalname , ..._.pick(req.body , ["description" , "title" , "sana"])})
    if(validat.error) throw new Error("validatsiyadan otmadi " + validat.error.details[0].message)
    const post = await schema.create({..._.pick(validat.value , ["description" , "title" , "sana"]) , file:req.file.filename})

    res.send(post)
}

module.exports = {
    deleteById,
    putByID,
    post
}