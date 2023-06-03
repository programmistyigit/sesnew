const joi = require("joi")

const validateObj = joi.object({
    login:joi.string().required(),
    password:joi.string().required()
})


module.exports = validateObj