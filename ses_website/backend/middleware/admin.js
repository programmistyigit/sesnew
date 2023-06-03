const joi = require("joi")
const _ = require("lodash")
const schema = require("../routers/admin/schema/schema")
const { reGenerateToken } = require("../routers/admin/token/token")


const valid = joi.object({
    _admin:joi.string().required()
})

const admin = async (req , res , next)=>{
    try {
        const result = valid.validate(_.pick(req.cookies , ['_admin']))
        if(result.error) return next()
        const admin = reGenerateToken(result.value._admin)
        if(admin.value == "" || !admin) return next()
        const db = await schema.findById(admin.value[0]._id)
        if(!db) return next()
        
        req.admin = true
        next()
    } catch (error) {
        return next()
    }
}

module.exports = admin