const joi = require("joi")

const validateObj = joi.object({
    message:joi.string().required(),
    fullName:joi.string().required(),
    tell:joi.string()
})


module.exports = validateObj