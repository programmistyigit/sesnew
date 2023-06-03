const router = require('express').Router();

const schema = require("./schema/schema");
const validate = require("./validate/validate");

const _ = require("lodash");
const secure = require('../../middleware/secure');

router.post('/' , async (req , res)=>{
    console.log(req.body);
    const result = validate.validate(_.pick(req.body , ["fullName" , "tell" , "message"]))
    if(result.error) throw new Error("validatsiyadan otmadi " +result.error.details[0].message)
    
    const message = await schema.create({
        fullName:result.value.fullName,
        tell:result.value.tell,
        message:result.value.message
    })
    res.send({status:true, message})
})

router.get("/all", secure, async (req, res)=>{
    const message = await schema.find().lean()
    res.send(message.reverse())
    message.forEach( async msg=>{
        await schema.findByIdAndUpdate(msg._id , {view :true})
    })
})

router.put("/view/:id" , secure,  async (req, res)=>{
    const message = await schema.findById(req.params.id).lean()
    if(!message) return res.send(true)
    
    await schema.findByIdAndUpdate(message._id , {view :true})
    res.send({status:true})
})

// router.get('/another-route' , (req , res)=>{
//     // router code here
// })

module.exports  = router